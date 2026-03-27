import { useState, useEffect } from 'react';
import { Gamepad2, Zap, Loader2, ChevronDown, Info } from 'lucide-react';
import { predictSentiment, predictHelpfulness } from '../api/xsteam';

export default function Analyser() {
    const [review, setReview] = useState('');
    const [playtimeHours, setPlaytimeHours] = useState('');
    const [isEarlyAccess, setIsEarlyAccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);
    const [showKeywords, setShowKeywords] = useState(false);
    const [showWarmupBanner, setShowWarmupBanner] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWarmupBanner(false);
        }, 8000);
        return () => clearTimeout(timer);
    }, []);

    const handleAnalyse = async () => {
        if (!review.trim()) {
            setError('Please enter a review');
            return;
        }

        setLoading(true);
        setError(null);
        setResults(null);
        setShowKeywords(false);

        const [sentimentResult, helpfulnessResult] = await Promise.all([
            predictSentiment(review),
            predictHelpfulness(review, playtimeHours === '' ? 0 : Number(playtimeHours), isEarlyAccess),
        ]);

        setLoading(false);

        if (sentimentResult.error || helpfulnessResult.error) {
            setError('Could not connect to AI backend. Please try again later.');
            return;
        }

        setResults({
            sentiment: sentimentResult.data,
            helpfulness: helpfulnessResult.data,
        });
    };

    const charCount = review.length;

    return (
        <div className="min-h-screen bg-[#0A0F1E] py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-3 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        Review Analyser
                    </h1>
                    <p className="text-gray-400">Paste any Steam review and get instant AI insights</p>
                </div>

                {showWarmupBanner && (
                    <div className="max-w-xl mx-auto mb-8 bg-[#00A8FF]/10 border border-[#00A8FF]/20 rounded-xl p-3 flex items-center justify-center text-center animate-pulse transition-opacity duration-1000">
                        <Info className="w-4 h-4 text-[#00A8FF] mr-2" />
                        <p className="text-sm text-gray-300">
                            Warming up AI engine... first response may take a few seconds
                        </p>
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-[#0D1526] p-8 rounded-2xl border border-white/[0.07]">
                        <label className="block text-xs uppercase tracking-wide text-gray-500 mb-3">
                            Steam Review
                        </label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Paste a Steam game review here..."
                            className="w-full min-h-[180px] bg-[#080D1A] text-white p-4 rounded-xl border border-white/[0.07] focus:border-[#00A8FF] focus:outline-none resize-none transition-all"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        />
                        <div className="text-xs text-gray-500 text-right mt-2">{charCount} characters</div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                                    <Gamepad2 className="w-4 h-4" />
                                    Hours Played
                                </label>
                                <input
                                    type="number"
                                    value={playtimeHours}
                                    onChange={(e) => setPlaytimeHours(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-[#080D1A] text-white px-4 py-3 rounded-xl border border-white/[0.07] focus:border-[#00A8FF] focus:outline-none transition-all"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">Early Access Review</label>
                                <button
                                    onClick={() => setIsEarlyAccess(!isEarlyAccess)}
                                    className={`w-full px-4 py-3 rounded-xl border transition-all ${isEarlyAccess
                                            ? 'bg-[#00A8FF] border-[#00A8FF] text-white'
                                            : 'bg-[#080D1A] border-white/[0.07] text-gray-400 hover:border-[#00A8FF]'
                                        }`}
                                >
                                    {isEarlyAccess ? 'Yes' : 'No'}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleAnalyse}
                            disabled={loading}
                            className="w-full mt-6 bg-[#00A8FF] hover:bg-[#0095E0] text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analysing...
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    Analyse Review
                                </>
                            )}
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-3">
                            Analysing sentiment and helpfulness simultaneously
                        </p>
                    </div>

                    <div className="bg-[#0D1526] p-8 rounded-2xl border border-white/[0.07] min-h-[500px]">
                        {error && (
                            <div className="border-2 border-[#FF4D6D] bg-[#FF4D6D]/10 rounded-xl p-6 text-center">
                                <p className="text-[#FF4D6D] font-medium">{error}</p>
                            </div>
                        )}

                        {!error && !results && !loading && (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <Zap className="w-12 h-12 text-gray-600" />
                                </div>
                                <p className="text-gray-500">Your results will appear here</p>
                            </div>
                        )}

                        {loading && (
                            <div className="space-y-6">
                                <div className="animate-pulse">
                                    <div className="h-8 bg-white/5 rounded w-1/3 mb-4"></div>
                                    <div className="h-12 bg-white/5 rounded w-2/3 mb-3"></div>
                                    <div className="h-4 bg-white/5 rounded w-full"></div>
                                </div>
                                <div className="animate-pulse">
                                    <div className="h-8 bg-white/5 rounded w-1/3 mb-4"></div>
                                    <div className="h-12 bg-white/5 rounded w-2/3 mb-3"></div>
                                    <div className="h-4 bg-white/5 rounded w-full"></div>
                                </div>
                                <p className="text-gray-500 text-center animate-pulse">Analysing review...</p>
                            </div>
                        )}

                        {results && !loading && (
                            <div className="space-y-8 animate-fade-in">
                                <div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                                        Sentiment
                                    </div>
                                    <div
                                        className={`text-4xl font-bold mb-4 ${results.sentiment.sentiment === 'Positive'
                                                ? 'text-[#00FFD1]'
                                                : 'text-[#FF4D6D]'
                                            }`}
                                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                    >
                                        {results.sentiment.sentiment}
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400">Confidence</span>
                                            <span className="text-white font-semibold">
                                                {Math.round(results.sentiment.confidence * 100)}%
                                            </span>
                                        </div>
                                        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ease-out ${results.sentiment.sentiment === 'Positive'
                                                        ? 'bg-[#00FFD1]'
                                                        : 'bg-[#FF4D6D]'
                                                    }`}
                                                style={{
                                                    width: `${results.sentiment.confidence * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${results.sentiment.recommended
                                                ? 'bg-[#00FFD1]/20 text-[#00FFD1]'
                                                : 'bg-[#FF4D6D]/20 text-[#FF4D6D]'
                                            }`}
                                    >
                                        {results.sentiment.recommended ? '✓ Recommended' : '✗ Not Recommended'}
                                    </div>

                                    {results.sentiment.top_keywords && results.sentiment.top_keywords.length > 0 && (
                                        <div 
                                            className="mt-5 bg-white/[0.03] rounded-xl border border-white/[0.06] transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,168,255,0.15)] hover:border-white/[0.1] hover:bg-[#0D1526] overflow-hidden cursor-pointer"
                                            onClick={() => setShowKeywords(!showKeywords)}
                                        >
                                            <div className="p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base">✨</span>
                                                    <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                                                        Why this prediction?
                                                    </span>
                                                </div>
                                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showKeywords ? 'rotate-180' : ''}`} />
                                            </div>
                                            <div 
                                                className={`grid transition-all duration-300 ease-in-out ${showKeywords ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="px-4 pb-4 flex flex-col gap-2 cursor-default" onClick={(e) => e.stopPropagation()}>
                                                        {results.sentiment.top_keywords.map((kw, i) => {
                                                            const isPos = kw.direction === 'positive';
                                                            const barColor = isPos ? '#00FFD1' : '#FF4D6D';
                                                            const textColor = isPos ? 'text-[#00FFD1]' : 'text-[#FF4D6D]';
                                                            const bgColor = isPos ? 'bg-[#00FFD1]/10' : 'bg-[#FF4D6D]/10';
                                                            return (
                                                                <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${bgColor}`}>
                                                                    <span className={`text-sm font-bold font-mono w-28 truncate ${textColor}`}>
                                                                        {kw.word}
                                                                    </span>
                                                                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                                        <div
                                                                            className="h-full rounded-full transition-all duration-700"
                                                                            style={{ width: `${Math.round(kw.influence * 100)}%`, backgroundColor: barColor }}
                                                                        />
                                                                    </div>
                                                                    <span className="text-xs text-gray-400 w-9 text-right tabular-nums">
                                                                        {Math.round(kw.influence * 100)}%
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="h-px bg-white/10"></div>

                                <div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                                        Helpfulness
                                    </div>
                                    <div
                                        className="text-3xl font-bold mb-4 text-white"
                                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                    >
                                        {results.helpfulness.helpfulness}
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400">Confidence</span>
                                            <span className="text-white font-semibold">
                                                {Math.round(results.helpfulness.confidence * 100)}%
                                            </span>
                                        </div>
                                        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#00A8FF] transition-all duration-1000 ease-out"
                                                style={{
                                                    width: `${results.helpfulness.confidence * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
