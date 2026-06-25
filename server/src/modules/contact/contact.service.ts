import { ContactMessage, IContactMessage } from './contact.model';
import {
  CreateContactMessageInput,
  ContactMessageQueryParams,
  PaginatedResponse,
} from './contact.types';

export class ContactMessageService {
  static async createMessage(data: CreateContactMessageInput): Promise<IContactMessage> {
    const message = new ContactMessage(data);
    return message.save();
  }

  static async getMessages(
    params: ContactMessageQueryParams
  ): Promise<PaginatedResponse<IContactMessage>> {
    const { page = 1, limit = 10, search, status } = params;

    const query: Record<string, any> = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      ContactMessage.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ContactMessage.countDocuments(query),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getMessageById(id: string): Promise<IContactMessage | null> {
    return ContactMessage.findById(id);
  }

  static async markAsRead(id: string): Promise<IContactMessage | null> {
    return ContactMessage.findByIdAndUpdate(
      id,
      { status: 'read' },
      { new: true }
    );
  }

  static async deleteMessage(id: string): Promise<IContactMessage | null> {
    return ContactMessage.findByIdAndDelete(id);
  }

  static async getUnreadCount(): Promise<number> {
    return ContactMessage.countDocuments({ status: 'unread' });
  }

  static async getMessageCount(): Promise<number> {
    return ContactMessage.countDocuments();
  }
}
