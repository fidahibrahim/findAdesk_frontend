import handleError from '@/utils/errorHandler';
import { MessageSquare, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react';

interface ReviewFormProps {
    workspaceName: string;
    bookingId: string;
    onCancel: () => void;
}

const ReviewForm = ({ workspaceName, bookingId, onCancel }: ReviewFormProps) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCancel();
            }
        };
        document.addEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'auto';
        };
    }, [onCancel]);

    const handleRatingClick = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        try {
            setIsSubmitting(true);
            // Replace with your API call to submit the review
            // Example: await submitReview(bookingId, { rating, review });
            // Mock success response
            setTimeout(() => {
                alert('Review submitted successfully!');
                onCancel()
                setIsSubmitting(false);
            }, 1000);
        } catch (error) {
            handleError(error);
            setIsSubmitting(false);
        }
    };
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                            Review {workspaceName}
                        </h3>
                        <button
                            onClick={onCancel}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmitReview}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Your Rating</label>
                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingClick(star)}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`w-6 h-6 ${star <= rating
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    </button>
                                ))}
                                <span className="ml-2 text-sm text-gray-600">
                                    {rating > 0 ? `${rating} out of 5` : 'Select rating'}
                                </span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="review" className="block text-gray-700 mb-2">
                                Your Review
                            </label>
                            <textarea
                                id="review"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Share your experience with this workspace..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                            ></textarea>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReviewForm
