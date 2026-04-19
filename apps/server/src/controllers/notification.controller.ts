import { Request, Response } from "express";
import Notification from "../models/Notification.js";
import { sendEmail } from "../utils/email.js";

export const getStagedNotifications = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const notifications = await Notification.find({ 
      jobId, 
      status: "staged" 
    }).sort({ createdAt: -1 });
    
    res.status(200).json(notifications);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch staged notifications", error: error.message });
  }
};

export const getAllStagedNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({ 
      status: "staged" 
    }).sort({ createdAt: -1 });
    
    res.status(200).json(notifications);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch all staged notifications", error: error.message });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Notification.findByIdAndDelete(id);
    res.status(200).json({ message: "Notification draft removed" });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete notification", error: error.message });
  }
};

export const sendAllStaged = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    const staged = await Notification.find({ jobId, status: "staged" });
    
    if (staged.length === 0) {
      res.status(400).json({ message: "No staged notifications to send" });
      return;
    }

    const results = await Promise.all(staged.map(async (note) => {
      const emailRes = await sendEmail(note.recipientEmail, note.subject, note.content);
      if (emailRes.success) {
        note.status = "sent";
        await note.save();
        return { id: note._id, success: true };
      } else {
        return { id: note._id, success: false, error: emailRes.error };
      }
    }));

    const successCount = results.filter(r => r.success).length;
    res.status(200).json({ 
      message: `Successfully processed notifications`,
      sent: successCount,
      failed: staged.length - successCount,
      details: results
    });
  } catch (error: any) {
    res.status(500).json({ message: "Bulk sending failed", error: error.message });
  }
};

export const sendAllGlobalStaged = async (req: Request, res: Response) => {
  try {
    const staged = await Notification.find({ status: "staged" });
    
    if (staged.length === 0) {
      res.status(400).json({ message: "No staged notifications to send" });
      return;
    }

    const results = await Promise.all(staged.map(async (note) => {
      const emailRes = await sendEmail(note.recipientEmail, note.subject, note.content);
      if (emailRes.success) {
        note.status = "sent";
        await note.save();
        return { id: note._id, success: true };
      } else {
        return { id: note._id, success: false, error: emailRes.error };
      }
    }));

    const successCount = results.filter(r => r.success).length;
    res.status(200).json({ 
      message: `Successfully processed global notifications`,
      sent: successCount,
      failed: staged.length - successCount,
      details: results
    });
  } catch (error: any) {
    res.status(500).json({ message: "Global bulk sending failed", error: error.message });
  }
};
