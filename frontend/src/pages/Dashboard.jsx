import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextDef";
import api, { setAuthToken } from "../services/api";

const Dashboard = () => {
  const { user, getAccessToken } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const token = getAccessToken();
        if (!token) {
          setError("No access token available");
          return;
        }
        
        setAuthToken(token);
        const { data } = await api.get("/api/feedback/my-feedbacks");
        setFeedbacks(data);
      } catch (error) {
        setError(error.response?.data?.error || "Failed to fetch feedbacks");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFeedbacks();
    }
  }, [user, getAccessToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="animate-fade-in">
            <div className="mb-6 sm:mb-8">
              <div className="h-6 sm:h-8 bg-gray-200 rounded-xl w-48 sm:w-64 mb-3 sm:mb-4 animate-pulse-soft"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded-lg w-72 sm:w-96 animate-pulse-soft"></div>
            </div>
            <div className="grid gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card p-4 sm:p-6 animate-pulse-soft">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl animate-pulse-soft"></div>
                    <div className="flex-1 space-y-2 sm:space-y-3">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 animate-pulse-soft"></div>
                      <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2 animate-pulse-soft"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="animate-fade-in">
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-error-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Something went wrong</h3>
              <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="animate-fade-in-up">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
                  My Feedbacks
                </h1>
                <p className="text-gray-600 text-sm sm:text-lg">
                  View all feedback you've received from your team
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white rounded-xl px-3 sm:px-4 py-2 shadow-soft border border-gray-100">
                  <span className="text-xs sm:text-sm font-medium text-gray-600">
                    Total: {feedbacks.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          {feedbacks.length === 0 ? (
            <div className="text-center py-8 sm:py-16 animate-fade-in-up">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2 sm:mb-3">No feedbacks yet</h3>
              <p className="text-gray-500 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
                You haven't received any feedback yet. Share your feedback ID with your team to start receiving feedback!
              </p>
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 sm:p-6 max-w-md mx-auto">
                <div className="flex items-center mb-2 sm:mb-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm font-semibold text-primary-800">Your Feedback ID</span>
                </div>
                <div className="bg-white rounded-lg p-2 sm:p-3 border border-primary-100">
                  <code className="text-xs sm:text-sm font-mono text-primary-700 break-all">{user.id}</code>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6">
              {feedbacks.map((fb, index) => (
                <div 
                  key={fb.id} 
                  className="card p-4 sm:p-6 hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-soft flex-shrink-0 ${
                        fb.type === 'positive' 
                          ? 'bg-success-100 text-success-600' 
                          : 'bg-warning-100 text-warning-600'
                      }`}>
                        {fb.type === 'positive' ? (
                          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2 min-w-0 flex-1">
                        <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                          fb.type === 'positive' 
                            ? 'bg-success-100 text-success-800' 
                            : 'bg-warning-100 text-warning-800'
                        }`}>
                          {fb.type === 'positive' ? 'Positive' : 'Constructive'}
                        </span>
                        {fb.is_anonymous && (
                          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Anonymous
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 sm:text-right">
                      {new Date(fb.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{fb.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
