import Loader from '@/components/generic/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReviewData } from '@/interface/user/reviewInterface';
import { Star } from 'lucide-react'


interface UserRating {
    userId: {
      firstName: string;
      lastName?: string;
      profileImage?: string;
    };
    rating: number;
    review?: string;
    createdAt: Date;
  }
  
  interface ReviewsProps {
    reviews: ReviewData | null;
    reviewsLoading: boolean;
  }
  

const Reviews = ({ reviews, reviewsLoading }: ReviewsProps) => {
    const formatReviewDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };
      const renderStars = (rating: number) => {
        return (
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${star <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
                  }`}
              />
            ))}
          </div>
        );
      };
    
    return (
        <div>
            <Card className="mb-8">
                <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                        <CardTitle>Ratings & Reviews</CardTitle>
                        {!reviewsLoading && reviews && (
                            <div className="flex items-center">
                                <div className="mr-2 text-lg font-semibold">
                                    {reviews.averageRating ? reviews.averageRating.toFixed(1) : "New"}
                                </div>
                                <div className="flex mr-2">
                                    {renderStars(reviews.averageRating || 0)}
                                </div>
                                <div className="text-sm text-gray-500">
                                    ({reviews.ratings?.length || 0} {reviews.ratings?.length === 1 ? "review" : "reviews"})
                                </div>
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {reviewsLoading ? (
                        <div className="flex items-center justify-center h-32">
                            <Loader />
                        </div>
                    ) : reviews && reviews.ratings && reviews.ratings.length > 0 ? (
                        <div className="divide-y">
                            {reviews.ratings.map((rating: UserRating, index: number) => (
                                <div key={index} className="p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium overflow-hidden">
                                                {rating.userId.profileImage ? (
                                                    <img
                                                        src={rating.userId.profileImage}
                                                        alt={`${rating.userId.firstName}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    rating.userId.firstName.charAt(0).toUpperCase() +
                                                    (rating.userId.lastName ? rating.userId.lastName.charAt(0).toUpperCase() : "")
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    {`${rating.userId.firstName} ${rating.userId.lastName || ""}`}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {formatReviewDate(rating.createdAt)}
                                                </div>
                                            </div>
                                        </div>
                                        <div>{renderStars(rating.rating)}</div>
                                    </div>
                                    {rating.review && (
                                        <p className="text-gray-700 mt-2">{rating.review}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                            <Star className="w-16 h-16 text-gray-300 mb-3" />
                            <h3 className="text-lg font-medium text-gray-700 mb-1">No Reviews Yet</h3>
                            <p className="text-gray-500 max-w-md">
                                This workspace hasn't received any reviews yet. Be the first to book and leave a review!
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default Reviews
