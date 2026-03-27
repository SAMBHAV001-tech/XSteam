import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Database, Target, TrendingUp, Layers, Loader2 } from 'lucide-react';
import { getStats } from '../api/xsteam';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            const { data, error } = await getStats();

            if (error) {
                setError('Could not load stats. Make sure Flask API is running on port 5000.');
                setLoading(false);
                return;
            }

            setStats(data);
            setLoading(false);
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#00A8FF] animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
                <div className="bg-[#0D1526] border-2 border-[#FF4D6D] rounded-xl p-8 max-w-md">
                    <p className="text-[#FF4D6D] text-center">{error}</p>
                </div>
            </div>
        );
    }

    const sentimentChartData = [
        {
            name: 'Logistic Regression',
            Accuracy: stats.sentiment_model.accuracy,
            'F1 Score': stats.sentiment_model.f1,
            'ROC-AUC': stats.sentiment_model.roc_auc,
        },
    ];

    const helpfulnessChartData = [
        {
            name: 'Random Forest',
            Accuracy: stats.helpfulness_model.accuracy,
            'F1 Score': stats.helpfulness_model.f1,
            'ROC-AUC': stats.helpfulness_model.roc_auc,
        },
    ];

    const modelTableData = [
        {
            model: 'Logistic Regression',
            task: 'Sentiment',
            accuracy: (stats.sentiment_model.accuracy * 100).toFixed(0) + '%',
            f1: stats.sentiment_model.f1.toFixed(2),
            rocAuc: stats.sentiment_model.roc_auc.toFixed(2),
            status: 'Active',
        },
        {
            model: 'XGBoost',
            task: 'Sentiment',
            accuracy: '93%',
            f1: '0.92',
            rocAuc: '0.96',
            status: 'Active',
        },
        {
            model: 'DistilBERT',
            task: 'Sentiment',
            accuracy: '94%',
            f1: '0.93',
            rocAuc: '0.97',
            status: 'Reference',
        },
        {
            model: 'Random Forest',
            task: 'Helpfulness',
            accuracy: (stats.helpfulness_model.accuracy * 100).toFixed(0) + '%',
            f1: stats.helpfulness_model.f1.toFixed(2),
            rocAuc: stats.helpfulness_model.roc_auc.toFixed(2),
            status: 'Active',
        },
    ];

    const techStack = [
        'Python',
        'Pandas',
        'NLTK',
        'scikit-learn',
        'XGBoost',
        'FastAPI',
        'React',
        'Recharts',
    ];

    return (
        <div className="min-h-screen bg-[#0A0F1E] py-12">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-12 text-white text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Dashboard
                </h1>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <div className="bg-[#0D1526] p-6 rounded-2xl border border-white/[0.07] border-t-4 border-t-[#00A8FF]">
                        <Database className="w-8 h-8 text-[#00A8FF] mb-3" />
                        <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {(stats.dataset_size / 1000).toFixed(0)}K
                        </div>
                        <div className="text-sm text-gray-400">Dataset Size</div>
                    </div>

                    <div className="bg-[#0D1526] p-6 rounded-2xl border border-white/[0.07] border-t-4 border-t-[#00A8FF]">
                        <Target className="w-8 h-8 text-[#00A8FF] mb-3" />
                        <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {(stats.sentiment_model.accuracy * 100).toFixed(0)}%
                        </div>
                        <div className="text-sm text-gray-400">Sentiment Accuracy</div>
                    </div>

                    <div className="bg-[#0D1526] p-6 rounded-2xl border border-white/[0.07] border-t-4 border-t-[#00A8FF]">
                        <TrendingUp className="w-8 h-8 text-[#00A8FF] mb-3" />
                        <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {(stats.helpfulness_model.accuracy * 100).toFixed(0)}%
                        </div>
                        <div className="text-sm text-gray-400">Helpfulness Accuracy</div>
                    </div>

                    <div className="bg-[#0D1526] p-6 rounded-2xl border border-white/[0.07] border-t-4 border-t-[#00A8FF]">
                        <Layers className="w-8 h-8 text-[#00A8FF] mb-3" />
                        <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                            {stats.models.length}
                        </div>
                        <div className="text-sm text-gray-400">Models Used</div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-8 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Model Performance
                </h2>

                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    <div className="bg-[#0D1526] p-6 rounded-2xl border border-white/[0.07]">
                        <h3 className="text-lg font-semibold mb-6 text-white">Sentiment Model Metrics</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={sentimentChartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888' }} />
                                <YAxis stroke="#888" tick={{ fill: '#888' }} domain={[0, 1]} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                    contentStyle={{
                                        backgroundColor: '#0D1526',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                    }}
                                    labelStyle={{ color: '#fff' }}
                                />
                                <Legend wrapperStyle={{ color: '#888' }} />
                                <Bar dataKey="Accuracy" fill="#00A8FF" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="F1 Score" fill="#00FFD1" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="ROC-AUC" fill="#0095E0" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-[#0D1526] p-6 rounded-2xl border border-white/[0.07]">
                        <h3 className="text-lg font-semibold mb-6 text-white">Helpfulness Model Metrics</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={helpfulnessChartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888' }} />
                                <YAxis stroke="#888" tick={{ fill: '#888' }} domain={[0, 1]} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                                    contentStyle={{
                                        backgroundColor: '#0D1526',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                    }}
                                    labelStyle={{ color: '#fff' }}
                                />
                                <Legend wrapperStyle={{ color: '#888' }} />
                                <Bar dataKey="Accuracy" fill="#00A8FF" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="F1 Score" fill="#00FFD1" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="ROC-AUC" fill="#0095E0" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-8 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Model Details
                </h2>

                <div className="bg-[#0D1526] rounded-2xl border border-white/[0.07] overflow-hidden mb-16">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Model</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Task</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Accuracy</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">F1 Score</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">ROC-AUC</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modelTableData.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className="border-t border-white/[0.07] hover:bg-white/5 transition-colors"
                                >
                                    <td className="px-6 py-4 text-white font-medium">{row.model}</td>
                                    <td className="px-6 py-4 text-gray-400">{row.task}</td>
                                    <td className="px-6 py-4 text-white">{row.accuracy}</td>
                                    <td className="px-6 py-4 text-white">{row.f1}</td>
                                    <td className="px-6 py-4 text-white">{row.rocAuc}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${row.status === 'Active'
                                                    ? 'bg-[#00FFD1]/20 text-[#00FFD1]'
                                                    : 'bg-[#00A8FF]/20 text-[#00A8FF]'
                                                }`}
                                        >
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h2 className="text-2xl font-bold mb-8 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Built With
                </h2>

                <div className="flex flex-wrap gap-3">
                    {techStack.map((tech, idx) => (
                        <span
                            key={idx}
                            className="px-4 py-2 bg-[#0D1526] border border-[#00A8FF] text-[#00A8FF] rounded-full text-sm font-medium"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
