interface UserRating {
    userId: {
      _id: string;
      firstName: string;
      lastName: string;
      profileImage?: string;
    };
    review?: string;
    rating: number;
    createdAt: Date;
  }
  
 export interface ReviewData {
    workspaceId: string;
    ratings: UserRating[];
    averageRating: number;
  }
  