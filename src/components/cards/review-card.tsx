import React from 'react';
import { IReview } from "@/types/review";

interface ReviewCardProps {
    review: IReview;
    onReply: (reviewId: string) => void;
    onMenuOpen: (reviewId: string) => void;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

// Generate a vibrant color based on a string
const generateColorFromString = (str: string): string => {
    // Vibrant colors array
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B',
        '#FB5607', '#8338EC', '#3A86FF', '#38B000',
        '#FF006E', '#8AC926', '#1982C4', '#6A4C93'
    ];

    // Simple hash function to generate a number from a string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Map the hash to a color index
    const index = Math.abs(hash) % colors.length;
    return colors[index];
};

// Create text avatar component
const TextAvatar = ({ name }: { name: string }) => {
    const initial = name.charAt(0).toUpperCase();
    const backgroundColor = generateColorFromString(name);

    return (
        <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
            style={{ backgroundColor }}
        >
            {initial}
        </div>
    );
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onReply, onMenuOpen }) => {
    const renderStars = (rating: number) => {
        return Array(5).fill(0).map((_, index) => (
            <span key={index} className={`text-lg ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                ★
            </span>
        ));
    };

    const renderReplySection = () => {
        if (review.reviewStatus === "Replied") {
            return (
                <div className="mt-2 pl-6 border-l-2 border-gray-200">
                    <p className="text-gray-700 font-medium">You replied with</p>
                    <p className="text-gray-600">
                        That is so great to hear. We really try our best. 😊 Thank you for choosing our product.
                    </p>
                </div>
            );
        }
        return null;
    };

    // Render user avatar (image or text-based)
    const renderAvatar = () => {
        // Check if we have a valid image URL - in a real app, you might want to validate this more thoroughly
        const hasValidImage = false; // This would be a check for a valid image URL

        if (hasValidImage) {
            return (
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                    <img
                        src="https://i.pravatar.cc/100"
                        alt={review.customerData.userName}
                        className="h-full w-full object-cover"
                    />
                </div>
            );
        } else {
            return <TextAvatar name={review.customerData.userName} />;
        }
    };

    return (
        <div className="border-b py-6 px-6">
            <div className="flex items-start">

                {/* Product Images */}
                <div className="mr-6">
                    <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden">
                        <img
                            src={review.ProductData.cover.bucketUrl}
                            alt={review.ProductData.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                {/* Product Name with truncation */}
                <div className="mr-8 w-32">
                    <p className="font-medium text-gray-800 truncate" title={review.ProductData.name}>
                        {review.ProductData.name}
                    </p>
                </div>

                {/* Reviewer with text avatar */}
                <div className="flex items-center mr-8 w-48">
                    <div className="mr-3 flex-shrink-0">
                        {renderAvatar()}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-800 truncate" title={review.customerData.userName}>
                            {review.customerData.userName}
                        </p>
                        <p className="text-gray-500 text-sm truncate w-full" title={review.customerData.email}>
                            {review.customerData.email}
                        </p>
                        {review.customerData.authMethod === "verified" && (
                            <div className="flex items-center text-sm text-green-600">
                                <svg className="h-4 w-4 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="truncate">Verified customer</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Review Content */}
                <div className="flex-1 mr-8">
                    <div className="flex mb-1">
                        {renderStars(review.rating)}
                    </div>
                    <h3 className="font-medium text-gray-800">Good product</h3>
                    <p className="text-gray-600 line-clamp-2" title={review.review}>
                        {review.review}
                    </p>

                    {renderReplySection()}
                </div>

                {/* Date */}
                <div className="w-32 text-right mr-4">
                    <p className="text-gray-500">{formatDate(review.createdAt)}</p>
                </div>

                {/* Status */}
                <div className="w-32 mr-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        review.reviewStatus === "Published"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                    }`}>
                        {review.reviewStatus}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center">
                    <button
                        onClick={() => onReply(review.id)}
                        className="mr-2 px-4 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                    >
                        Reply
                    </button>
                    <button
                        onClick={() => onMenuOpen(review.id)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;