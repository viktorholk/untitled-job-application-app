import { Request, Response } from "express";
import { IUser } from "@/models/types";
import ProfileModel from "@/models/profile";
import DocumentModel from "@/models/document";
import CompanyModel from "@/models/company";
import UserModel from "@/models/user";

export async function get(req: Request, res: Response) {
  // Get profile or the company 'profile'
  const user = await UserModel.findById(req.user?._id);

  if (!user) return res.sendResponse(403, "User not found");

  if (user.isCompany()) {
    const company = await CompanyModel.findById(user.company);

    if (!company) return res.sendResponse(404, "Company not found");

    return res.sendResponse(200, company.toObject());
  } else {
    const profile = await ProfileModel.aggregate([
      {
        $lookup: {
          from: "documents",
          localField: "_id",
          foreignField: "profile",
          as: "documents",
        },
      },
      {
        $match: { _id: user.profile },
      },
    ]);

    if (!profile) return res.sendResponse(404, "Profile not found");

    return res.sendResponse(200, profile);
  }
}
