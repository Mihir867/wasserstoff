import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, selectReviews, selectReviewLoading, selectReviewError } from '../redux/slices/reviewSlice';

interface Review {
  id: number;
  rating: number;
  comment: string;
  userImage: string;
  date: string;
}

interface CustomerReviewsProps {
  productId: number; // Expect a product ID to fetch reviews for
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ productId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviews);
  const loading = useSelector(selectReviewLoading);
  const error = useSelector(selectReviewError);
  
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [sortOption, setSortOption] = useState<string>('date');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const reviewsPerPage = 4;

 

  useEffect(() => {
    let sortedReviews = [...reviews];

    // Sort by date or rating
    if (sortOption === 'date') {
      sortedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortOption === 'rating') {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    }

    // Filter by rating
    if (ratingFilter) {
      sortedReviews = sortedReviews.filter(review => review.rating === ratingFilter);
    }

    setFilteredReviews(sortedReviews);
  }, [sortOption, ratingFilter, reviews]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleRatingFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRatingFilter(Number(e.target.value) || null);
  };

  // Pagination logic
  const lastIndex = currentPage * reviewsPerPage;
  const firstIndex = lastIndex - reviewsPerPage;
  const currentReviews = filteredReviews.slice(firstIndex, lastIndex);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredReviews.length / reviewsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  if (error) {
    return <div>Error fetching reviews: {error}</div>; // Show error message if fetching fails
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Reviews</h2>

      <div className="flex justify-between mb-4 space-x-4">
        <div className="relative">
          <select
            onChange={handleSortChange}
            value={sortOption}
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
          >
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        <div className="relative">
          <select
            onChange={handleRatingFilterChange}
            value={ratingFilter ?? ''}
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
          >
            <option value="">Filter by Rating</option>
            {[5, 4, 3, 2, 1].map(rating => (
              <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {currentReviews.map(review => (
          <motion.div
            key={review.id}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-gray-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center">
              <img src={review.userImage} alt="User" className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
                <p className="font-bold text-gray-800">{review.comment}</p>
                <p className="text-sm text-gray-600">Rating: {review.rating} Stars</p>
                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`bg-blue-500 text-white p-2 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 hover:bg-blue-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(filteredReviews.length / reviewsPerPage)}
          className={`bg-blue-500 text-white p-2 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 hover:bg-blue-600 ${currentPage === Math.ceil(filteredReviews.length / reviewsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerReviews;