import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextDef";
import api, { setAuthToken } from "../services/api";

const AdminDashboard = () => {
  const { user, getAccessToken } = useContext(AuthContext);
  const [metrics, setMetrics] = useState(null);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("metrics"); // "metrics" or "feedbacks"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = getAccessToken();
        if (!token) {
          setError("No access token available");
          return;
        }
        
        setAuthToken(token);
        
        // Fetch metrics
        const { data: metricsData } = await api.get("/api/feedback/metrics");
        setMetrics(metricsData);
        
        // Fetch all feedbacks
        const { data: feedbacksData } = await api.get("/api/feedback/all-feedbacks");
        setAllFeedbacks(feedbacksData);
      } catch (error) {
        setError(error.response?.data?.error || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card p-4 sm:p-6 animate-pulse-soft">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 animate-pulse-soft"></div>
                      <div className="h-6 sm:h-8 bg-gray-200 rounded w-12 sm:w-16 animate-pulse-soft"></div>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl animate-pulse-soft"></div>
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
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Failed to load data</h3>
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

  if (!metrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="animate-fade-in">
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No data available</h3>
              <p className="text-gray-500 text-sm sm:text-base">There are no admin data to display at this time.</p>
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
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-soft">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 text-sm sm:text-lg">
                  Overview of feedback metrics and analytics
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6 sm:mb-8">
            <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab("metrics")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === "metrics"
                    ? "bg-white text-primary-700 shadow-soft"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Metrics
              </button>
              <button
                onClick={() => setActiveTab("feedbacks")}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === "feedbacks"
                    ? "bg-white text-primary-700 shadow-soft"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                All Feedbacks ({allFeedbacks.length})
              </button>
            </div>
          </div>
          
          {/* Content based on active tab */}
          {activeTab === "metrics" ? (
            <>
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="card-elevated p-4 sm:p-6 hover-lift animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Total Feedbacks</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-800">{metrics.total}</p>
                      <p className="text-xs text-gray-500 mt-1">All time</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center shadow-soft">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="card-elevated p-4 sm:p-6 hover-lift animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Positive</p>
                      <p className="text-2xl sm:text-3xl font-bold text-success-600">{metrics.positive}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {metrics.total > 0 ? Math.round((metrics.positive / metrics.total) * 100) : 0}% of total
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success-100 rounded-xl flex items-center justify-center shadow-soft">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="card-elevated p-4 sm:p-6 hover-lift animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Constructive</p>
                      <p className="text-2xl sm:text-3xl font-bold text-warning-600">{metrics.constructive}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {metrics.total > 0 ? Math.round((metrics.constructive / metrics.total) * 100) : 0}% of total
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-warning-100 rounded-xl flex items-center justify-center shadow-soft">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="card-elevated p-4 sm:p-6 hover-lift animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium mb-1">Anonymous</p>
                      <p className="text-2xl sm:text-3xl font-bold text-purple-600">{metrics.anonymous}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {metrics.total > 0 ? Math.round((metrics.anonymous / metrics.total) * 100) : 0}% of total
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center shadow-soft">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Summary Section */}
              <div className="card-elevated p-4 sm:p-6 lg:p-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Analytics Summary</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-success-50 to-success-100 rounded-xl border border-success-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-success-700 mb-1 sm:mb-2">
                      {metrics.total > 0 ? Math.round((metrics.positive / metrics.total) * 100) : 0}%
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-success-800">Positive Rate</p>
                    <p className="text-xs text-success-600 mt-1">Encouraging feedback</p>
                  </div>
                  
                  <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-warning-50 to-warning-100 rounded-xl border border-warning-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-warning-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-warning-700 mb-1 sm:mb-2">
                      {metrics.total > 0 ? Math.round((metrics.constructive / metrics.total) * 100) : 0}%
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-warning-800">Constructive Rate</p>
                    <p className="text-xs text-warning-600 mt-1">Improvement suggestions</p>
                  </div>
                  
                  <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 sm:col-span-2 lg:col-span-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-700 mb-1 sm:mb-2">
                      {metrics.total > 0 ? Math.round((metrics.anonymous / metrics.total) * 100) : 0}%
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-purple-800">Anonymous Rate</p>
                    <p className="text-xs text-purple-600 mt-1">Honest feedback</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* All Feedbacks Tab */
            <div className="animate-fade-in-up">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">All Feedbacks</h3>
                <p className="text-gray-600 text-sm">Showing all feedbacks in the system</p>
              </div>
              
              {allFeedbacks.length === 0 ? (
                <div className="text-center py-8 sm:py-16">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2 sm:mb-3">No feedbacks yet</h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    There are no feedbacks in the system yet.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:gap-6">
                  {allFeedbacks.map((fb, index) => (
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
                      <div className="mt-3 sm:mt-4 text-xs text-gray-500">
                        <p><strong>From:</strong> {fb.sender_id}</p>
                        <p><strong>To:</strong> {fb.receiver_id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
