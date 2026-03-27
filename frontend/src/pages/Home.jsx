import { Link } from 'react-router-dom';
import { Brain, BarChart3, Zap, FileText, Cpu, TrendingUp } from 'lucide-react';
import Logo from '../components/Logo';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0A0F1E]">
            <section className="max-w-7xl mx-auto px-6 py-24 text-center">
                <h1 className="text-6xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Decode Every Review.
                    <br />
                    <span className="text-[#00A8FF]" style={{ textShadow: '0 0 24px rgba(0, 168, 255, 0.4)' }}>
                        Powered by AI.
                    </span>
                </h1>
                <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
                    XSteam uses NLP and machine learning to analyse Steam game reviews — predicting sentiment and community helpfulness in seconds.
                </p>

                <div className="flex items-center justify-center gap-4">
                    <Link
                        to="/analyser"
                        className="px-8 py-4 bg-[#00A8FF] text-white font-semibold rounded-xl hover:bg-[#0095E0] transition-all"
                    >
                        Try the Analyser
                    </Link>
                    <Link
                        to="/dashboard"
                        className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
                    >
                        View Dashboard
                    </Link>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 mb-16">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>

            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div
                        className="bg-[#0D1526] p-8 rounded-2xl border border-white/[0.07] hover:shadow-[0_0_24px_rgba(0,168,255,0.15)] transition-all"
                    >
                        <div className="text-4xl mb-4">🧠</div>
                        <h3 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Sentiment Analysis
                        </h3>
                        <p className="text-gray-400">
                            Detects whether a review is positive or negative with 91% accuracy
                        </p>
                    </div>

                    <div
                        className="bg-[#0D1526] p-8 rounded-2xl border border-white/[0.07] hover:shadow-[0_0_24px_rgba(0,168,255,0.15)] transition-all"
                    >
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Helpfulness Score
                        </h3>
                        <p className="text-gray-400">
                            Predicts if the community will find your review useful
                        </p>
                    </div>

                    <div
                        className="bg-[#0D1526] p-8 rounded-2xl border border-white/[0.07] hover:shadow-[0_0_24px_rgba(0,168,255,0.15)] transition-all"
                    >
                        <div className="text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            Instant Results
                        </h3>
                        <p className="text-gray-400">
                            Powered by Logistic Regression, XGBoost and DistilBERT
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-[#0D1526] border-y border-white/[0.07] py-16 mt-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-[#00A8FF] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                100K
                            </div>
                            <div className="text-sm text-gray-400">Reviews Analysed</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-[#00A8FF] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                91%
                            </div>
                            <div className="text-sm text-gray-400">Sentiment Accuracy</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-[#00A8FF] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                85%
                            </div>
                            <div className="text-sm text-gray-400">Helpfulness Accuracy</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-[#00A8FF] mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                3
                            </div>
                            <div className="text-sm text-gray-400">ML Models</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-24">
                <h2 className="text-4xl font-bold text-center mb-16 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    How XSteam Works
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
                    <div className="text-center max-w-xs">
                        <div className="w-16 h-16 bg-[#00A8FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                            1
                        </div>
                        <FileText className="w-12 h-12 text-[#00A8FF] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-white">Paste Review</h3>
                        <p className="text-gray-400">Copy any Steam review and paste it into our analyser</p>
                    </div>

                    <div className="hidden md:block flex-1 h-px border-t-2 border-dashed border-white/20 max-w-[100px]"></div>

                    <div className="text-center max-w-xs">
                        <div className="w-16 h-16 bg-[#00A8FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                            2
                        </div>
                        <Cpu className="w-12 h-12 text-[#00A8FF] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-white">AI Analyses</h3>
                        <p className="text-gray-400">Our ML models process the text and metadata instantly</p>
                    </div>

                    <div className="hidden md:block flex-1 h-px border-t-2 border-dashed border-white/20 max-w-[100px]"></div>

                    <div className="text-center max-w-xs">
                        <div className="w-16 h-16 bg-[#00A8FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                            3
                        </div>
                        <TrendingUp className="w-12 h-12 text-[#00A8FF] mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-white">Get Insights</h3>
                        <p className="text-gray-400">Receive sentiment, helpfulness score and confidence levels</p>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/[0.07] py-8 mt-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex justify-center">
                        <Logo size="sm" showAuthor={true} />
                    </div>
                </div>
            </footer>
        </div>
    );
}
