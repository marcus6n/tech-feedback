import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextDef";
import api, { setAuthToken } from "../services/api";

const SendFeedback = () => {
  const { getAccessToken } = useContext(AuthContext);
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("positive");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receiverId.trim() || !message.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const token = getAccessToken();
      if (!token) {
        setError("No access token available");
        return;
      }

      setAuthToken(token);
      await api.post("/api/feedback", {
        receiverId,
        message,
        type,
        isAnonymous,
      });

      setSuccess(true);
      setMessage("");
      setReceiverId("");
      setType("positive");
      setIsAnonymous(false);

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to send feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in-up">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  Send Feedback
                </h1>
                <p className="text-gray-600 text-lg text-balance">
                  Share constructive feedback with your team members
                </p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-success-50 border border-success-200 text-success-700 rounded-xl animate-fade-in">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">
                  Feedback sent successfully!
                </span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-error-50 border border-error-200 text-error-700 rounded-xl animate-fade-in">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="card-elevated p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Receiver ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Receiver ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                    placeholder="Enter the receiver's user ID"
                    className="form-input pl-12"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-3 flex items-start">
                  <svg
                    className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Ask your team member for their user ID to send them feedback
                  </span>
                </p>
              </div>

              {/* Feedback Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Feedback Message
                </label>
                <div className="relative">
                  <div className="absolute top-4 left-4 flex items-start pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your feedback here..."
                    className="form-textarea pl-12"
                    rows="6"
                    maxLength={500}
                    required
                  />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm text-gray-500">
                    Be constructive and specific in your feedback
                  </p>
                  <p className="text-sm text-gray-400">{message.length}/500</p>
                </div>
              </div>

              {/* Feedback Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Feedback Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 hover-scale ${
                      type === "positive"
                        ? "border-success-300 bg-success-50 shadow-soft"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-soft"
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value="positive"
                      checked={type === "positive"}
                      onChange={(e) => setType(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          type === "positive"
                            ? "border-success-500 bg-success-500"
                            : "border-gray-300"
                        }`}
                      >
                        {type === "positive" && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-700 text-base">
                          Positive Feedback
                        </div>
                        <div className="text-sm text-gray-500">
                          Recognize good work
                        </div>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 hover-scale ${
                      type === "constructive"
                        ? "border-warning-300 bg-warning-50 shadow-soft"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-soft"
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value="constructive"
                      checked={type === "constructive"}
                      onChange={(e) => setType(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          type === "constructive"
                            ? "border-warning-500 bg-warning-500"
                            : "border-gray-300"
                        }`}
                      >
                        {type === "constructive" && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-700 text-base">
                          Constructive Feedback
                        </div>
                        <div className="text-sm text-gray-500">
                          Suggest improvements
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Anonymous Option */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"
                  />
                  <div>
                    <label
                      htmlFor="anonymous"
                      className="text-base font-semibold text-gray-700 mb-2 block"
                    >
                      Send feedback anonymously
                    </label>
                    <p className="text-sm text-gray-500">
                      The receiver won't know who sent this feedback. This can
                      encourage more honest feedback.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-base py-4"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner w-5 h-5 mr-3"></div>
                    <span>Sending feedback...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span>Send Feedback</span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendFeedback;
