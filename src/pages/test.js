import React, { useState } from 'react';

const TestPage = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results = {};

    // Test 1: Form Submission
    try {
      const formData = {
        name: "Test User",
        phone: "555-555-5555",
        address: "123 Test St"
      };
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      results.formSubmission = response.ok ? "✅ Working" : "❌ Failed";
    } catch (error) {
      results.formSubmission = "❌ Error: " + error.message;
    }

    // Test 2: Analytics Tracking
    try {
      if (window.gtag) {
        results.analytics = "✅ Google Analytics Connected";
      } else {
        results.analytics = "❌ Google Analytics Not Found";
      }
    } catch (error) {
      results.analytics = "❌ Error: " + error.message;
    }

    setTestResults(results);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">System Test Page</h1>
      
      <button 
        onClick={runTests}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Running Tests..." : "Run Tests"}
      </button>

      {Object.keys(testResults).length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Test Results:</h2>
          <div className="space-y-4">
            {Object.entries(testResults).map(([test, result]) => (
              <div key={test} className="p-4 bg-gray-100 rounded">
                <strong>{test}:</strong> {result}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Manual Test Form</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input 
              type="tel" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input 
              type="text" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
            />
          </div>
          <button 
            type="submit" 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Test Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestPage;