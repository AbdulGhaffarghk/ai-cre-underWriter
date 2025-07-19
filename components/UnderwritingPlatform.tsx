'use client'
import React, { useState, useRef } from 'react';
import { Upload, FileText, Settings, TrendingUp, DollarSign, AlertTriangle, CheckCircle, XCircle, Download, MapPin, Building2, Calculator, BarChart3 } from 'lucide-react';

const UnderwritingPlatform = () => {
  const [activeTab, setActiveTab] = useState('underwrite');
  const [property, setProperty] = useState({ address: '', city: '', state: '' });
  const [files, setFiles] = useState({ t12: null as File | null, rentRoll: null as File | null });
  const [criteria, setCriteria] = useState({
    minCocReturn: 8,
    minCapRate: 6,
    maxYearBuilt: 1990,
    targetHoldPeriod: 5
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [dealHistory] = useState([
    { id: 1, address: '1234 Main St, Austin, TX', date: '2025-07-15', status: 'pass', cocReturn: 12.3 },
    { id: 2, address: '5678 Oak Ave, Dallas, TX', date: '2025-07-14', status: 'fail', cocReturn: 5.2 },
    { id: 3, address: '9101 Pine Rd, Houston, TX', date: '2025-07-13', status: 'pass', cocReturn: 9.8 }
  ]);

  const fileInputT12 = useRef<HTMLInputElement>(null);
  const fileInputRentRoll = useRef<HTMLInputElement>(null);

  const handleFileUpload = (type: 't12' | 'rentRoll', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFiles(prev => ({ ...prev, [type]: file }));
    }
  };

  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate API calls and processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results
    const mockResults = {
      propertyInfo: {
        address: property.address || '123 Sample Street, Austin, TX 78701',
        units: 48,
        yearBuilt: 1995,
        squareFeet: 52000,
        lotSize: '2.1 acres'
      },
      financials: {
        grossRent: 468000,
        netOperatingIncome: 350400,
        purchasePrice: 5850000,
        capRate: 6.2,
        cocReturn: 11.4,
        dscr: 1.35,
        cashRequired: 1755000
      },
      marketData: {
        avgRentPsf: 1.85,
        marketCapRate: 5.8,
        crimeScore: 'B+',
        schoolRating: 8.2,
        walkScore: 72,
        medianIncome: 68500
      },
      riskFactors: [
        { type: 'low', message: 'Property built after minimum year requirement' },
        { type: 'medium', message: 'Slightly below market rent - opportunity for growth' },
        { type: 'low', message: 'Strong school district supports tenant demand' }
      ],
      recommendation: 'pass',
      confidenceScore: 87
    };
    
    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const exportToExcel = () => {
    // In a real implementation, this would generate an actual Excel file
    const data = `Property Analysis Export - ${results.propertyInfo.address}\n\nKey Metrics:\nCap Rate: ${results.financials.capRate}%\nCash-on-Cash Return: ${results.financials.cocReturn}%\nDSCR: ${results.financials.dscr}\n\nRecommendation: ${results.recommendation.toUpperCase()}`;
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'underwriting-analysis.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">CRE Underwriter AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Analyze deals in under 30 seconds</span>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-600">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4">
            <TabButton id="underwrite" label="Underwrite Deal" icon={Calculator} />
            <TabButton id="history" label="Deal History" icon={BarChart3} />
            <TabButton id="settings" label="Buy Box Settings" icon={Settings} />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'underwrite' && (
          <div className="space-y-8">
            {/* Property Input */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Property Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Property Address"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={property.address}
                  onChange={(e) => setProperty(prev => ({ ...prev, address: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder="City"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={property.city}
                  onChange={(e) => setProperty(prev => ({ ...prev, city: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder="State"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={property.state}
                  onChange={(e) => setProperty(prev => ({ ...prev, state: e.target.value }))}
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-blue-600" />
                Document Upload
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">T12 Financials</label>
                  <div
                    onClick={() => fileInputT12.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      files.t12 ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <FileText className={`w-8 h-8 mx-auto mb-2 ${files.t12 ? 'text-green-600' : 'text-gray-400'}`} />
                    <p className={`text-sm ${files.t12 ? 'text-green-600' : 'text-gray-600'}`}>
                      {files.t12 ? files.t12.name : 'Click to upload T12 (PDF/Excel)'}
                    </p>
                  </div>
                  <input
                    ref={fileInputT12}
                    type="file"
                    accept=".pdf,.xlsx,.xls"
                    onChange={(e) => handleFileUpload('t12', e)}
                    className="hidden"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rent Roll</label>
                  <div
                    onClick={() => fileInputRentRoll.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      files.rentRoll ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <FileText className={`w-8 h-8 mx-auto mb-2 ${files.rentRoll ? 'text-green-600' : 'text-gray-400'}`} />
                    <p className={`text-sm ${files.rentRoll ? 'text-green-600' : 'text-gray-600'}`}>
                      {files.rentRoll ? files.rentRoll.name : 'Click to upload Rent Roll (PDF/Excel)'}
                    </p>
                  </div>
                  <input
                    ref={fileInputRentRoll}
                    type="file"
                    accept=".pdf,.xlsx,.xls"
                    onChange={(e) => handleFileUpload('rentRoll', e)}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Analyze Button */}
            <div className="flex justify-center">
              <button
                onClick={simulateAnalysis}
                disabled={isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all transform hover:scale-105 disabled:scale-100 flex items-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Analyzing Deal...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    <span>Analyze Deal in 30 Seconds</span>
                  </>
                )}
              </button>
            </div>

            {/* Results */}
            {results && (
              <div className="space-y-6">
                {/* Recommendation Banner */}
                <div className={`rounded-xl p-6 ${
                  results.recommendation === 'pass' 
                    ? 'bg-green-50 border-2 border-green-200' 
                    : 'bg-red-50 border-2 border-red-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {results.recommendation === 'pass' ? (
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                      <div>
                        <h3 className={`text-2xl font-bold ${
                          results.recommendation === 'pass' ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {results.recommendation === 'pass' ? 'DEAL APPROVED' : 'DEAL REJECTED'}
                        </h3>
                        <p className={`${
                          results.recommendation === 'pass' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          Confidence Score: {results.confidenceScore}%
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={exportToExcel}
                        className="bg-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Excel</span>
                      </button>
                      <button className="bg-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>Export PDF</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Key Metrics */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                      Key Financial Metrics
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Cap Rate</span>
                        <span className="font-semibold text-lg">{results.financials.capRate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Cash-on-Cash Return</span>
                        <span className="font-semibold text-lg text-green-600">{results.financials.cocReturn}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">DSCR</span>
                        <span className="font-semibold text-lg">{results.financials.dscr}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Purchase Price</span>
                        <span className="font-semibold text-lg">${results.financials.purchasePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Cash Required</span>
                        <span className="font-semibold text-lg">${results.financials.cashRequired.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Property & Market Info */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                      Property & Market Data
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Units</span>
                        <span className="font-semibold">{results.propertyInfo.units}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Year Built</span>
                        <span className="font-semibold">{results.propertyInfo.yearBuilt}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Market Cap Rate</span>
                        <span className="font-semibold">{results.marketData.marketCapRate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">School Rating</span>
                        <span className="font-semibold">{results.marketData.schoolRating}/10</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Walk Score</span>
                        <span className="font-semibold">{results.marketData.walkScore}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                    Risk Assessment
                  </h3>
                  <div className="space-y-3">
                    {results.riskFactors.map((risk: any, index: number) => (
                      <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                        risk.type === 'low' ? 'bg-green-50' : risk.type === 'medium' ? 'bg-yellow-50' : 'bg-red-50'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          risk.type === 'low' ? 'bg-green-500' : risk.type === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className={`text-sm ${
                          risk.type === 'low' ? 'text-green-800' : risk.type === 'medium' ? 'text-yellow-800' : 'text-red-800'
                        }`}>
                          {risk.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Deal History</h2>
              <div className="text-sm text-gray-600">
                {dealHistory.filter(d => d.status === 'pass').length} of {dealHistory.length} deals approved
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Property</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">CoC Return</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dealHistory.map((deal) => (
                    <tr key={deal.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{deal.address}</td>
                      <td className="py-3 px-4 text-gray-600">{deal.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          deal.status === 'pass' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {deal.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">{deal.cocReturn}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Investment Criteria (Buy Box)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Cash-on-Cash Return (%)
                </label>
                <input
                  type="number"
                  value={criteria.minCocReturn}
                  onChange={(e) => setCriteria(prev => ({ ...prev, minCocReturn: parseFloat(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Cap Rate (%)
                </label>
                <input
                  type="number"
                  value={criteria.minCapRate}
                  onChange={(e) => setCriteria(prev => ({ ...prev, minCapRate: parseFloat(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Year Built (older properties excluded)
                </label>
                <input
                  type="number"
                  value={criteria.maxYearBuilt}
                  onChange={(e) => setCriteria(prev => ({ ...prev, maxYearBuilt: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Hold Period (years)
                </label>
                <input
                  type="number"
                  value={criteria.targetHoldPeriod}
                  onChange={(e) => setCriteria(prev => ({ ...prev, targetHoldPeriod: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnderwritingPlatform;