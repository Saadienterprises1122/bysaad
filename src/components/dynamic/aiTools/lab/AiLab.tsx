import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Check, 
  Loader2, 
  Terminal, 
  Wand2, 
  Sparkles
} from 'lucide-react';
import { generateToolResult, ToolType } from '@/lib/api/geminiService';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AI_LAB_TOOLS } from './AiLabData';
import { AiLabProps } from './AiLabTypes';

const AiLab: React.FC<AiLabProps> = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('code-refactor');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeToolData = AI_LAB_TOOLS.find(t => t.id === activeTool);
  const isLongInput = ['code-refactor', 'resume-analyzer', 'readme-generator', 'unit-test-writer', 'user-persona', 'api-ideas'].includes(activeTool);

  const handleGenerate = async () => {
    if (!input.trim()) {
        toast.error("Please enter some input first.");
        return;
    }
    setLoading(true);
    setResult(null);
    
    try {
        const data = await generateToolResult(activeTool, input);
        setResult(data);
    } catch (error) {
        toast.error("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-lab-main" className="ai-lab-container py-24 bg-dark-900 relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4 border border-purple-500/20">
                <Wand2 className="w-4 h-4" />
                Developer Toolkit
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">AI <span className="gradient-text">Lab</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Advanced tools tailored for developers, designers, and data analysts.
            </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
            {/* Tool Selector Sidebar */}
            <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {AI_LAB_TOOLS.map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => {
                                setActiveTool(tool.id as ToolType);
                                setResult(null);
                                setInput('');
                            }}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 group ${
                                activeTool === tool.id 
                                ? 'bg-primary-900/20 border-primary-500/50 shadow-[0_0_20px_rgba(139,92,246,0.15)]' 
                                : 'bg-white/5 border-white/5 hover:bg-white/10'
                            }`}
                        >
                            <div className={`p-3 rounded-lg transition-colors shrink-0 ${
                                activeTool === tool.id ? 'bg-primary-600 text-white' : 'bg-dark-900 text-gray-400 group-hover:text-white'
                            }`}>
                                <tool.icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                                <div className={`font-bold transition-colors text-sm truncate ${activeTool === tool.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                    {tool.label}
                                </div>
                                <div className="text-xs text-gray-500 line-clamp-1">{tool.desc}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Workspace */}
            <div className="lg:col-span-9">
                <div className="bg-dark-800 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col min-h-[600px]">
                    
                    {/* Input Section */}
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Terminal className="w-4 h-4" /> Input
                        </label>
                        <div className="relative">
                            {isLongInput ? (
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={activeToolData?.placeholder}
                                    className="w-full h-48 bg-dark-900/50 border border-white/10 rounded-xl p-4 text-sm font-mono text-gray-300 focus:outline-none focus:border-primary-500 transition-colors resize-none custom-scrollbar"
                                />
                            ) : (
                                <input 
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={activeToolData?.placeholder}
                                    className="w-full bg-dark-900/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                />
                            )}
                            <div className="absolute bottom-4 right-4">
                                <Button 
                                    size="sm" 
                                    onClick={handleGenerate} 
                                    disabled={loading || !input.trim()}
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                                    {loading ? 'Processing...' : 'Run Tool'}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Output Section */}
                    <div className="flex-grow flex flex-col">
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Result</span>
                            {result && activeTool !== 'color-palette' && activeTool !== 'image-generator' && (
                                <button 
                                    onClick={() => copyToClipboard(typeof result === 'string' ? result : '')}
                                    className="text-xs text-primary-400 hover:text-white flex items-center gap-1 transition-colors"
                                >
                                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    {copied ? 'Copied' : 'Copy Result'}
                                </button>
                            )}
                            {activeTool === 'image-generator' && result && typeof result === 'string' && result.startsWith('data:image') && (
                                <button 
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = result;
                                        link.download = 'generated-image.png';
                                        link.click();
                                    }}
                                    className="text-xs text-primary-400 hover:text-white flex items-center gap-1 transition-colors"
                                >
                                    <Check className="w-3 h-3" /> Download Image
                                </button>
                            )}
                        </label>
                        
                        <div className="flex-grow bg-dark-900 rounded-xl border border-white/5 p-1 relative overflow-hidden min-h-[300px] flex flex-col">
                            {loading ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-3">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                                    <p className="text-sm animate-pulse">AI is analyzing your request...</p>
                                </div>
                            ) : !result ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 gap-2 p-8 text-center">
                                    {activeToolData && <activeToolData.icon className="w-10 h-10 opacity-20" />}
                                    <p className="text-sm">Run the tool to see results here.</p>
                                </div>
                            ) : (
                                <div className="flex-grow max-h-[500px] overflow-y-auto custom-scrollbar p-4">
                                    {/* Image Result */}
                                    {activeTool === 'image-generator' && typeof result === 'string' && result.startsWith('data:image') ? (
                                        <div className="h-full flex items-center justify-center">
                                            <img src={result} alt="AI Generated" className="max-h-full max-w-full rounded-lg shadow-lg object-contain" />
                                        </div>
                                    ) : activeTool === 'color-palette' ? (
                                        <div className="h-full flex flex-col justify-center">
                                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                                                {Array.isArray(result) && result.map((color: any, idx: number) => (
                                                    <motion.div 
                                                        key={idx}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className="group relative aspect-[3/4] sm:aspect-auto sm:h-64 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                                                        onClick={() => copyToClipboard(color.hex)}
                                                        style={{ backgroundColor: color.hex }}
                                                    >
                                                        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <p className="text-white font-bold text-lg">{color.hex}</p>
                                                            <p className="text-gray-300 text-xs font-medium mb-1">{color.name}</p>
                                                            <p className="text-gray-400 text-[10px] uppercase tracking-wider">{color.usage}</p>
                                                        </div>
                                                        <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Copy className="w-3 h-3 text-white" />
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <p className="text-center text-gray-500 text-xs mt-6">Click a color card to copy the HEX code.</p>
                                        </div>
                                    ) : (
                                        <div className="prose prose-invert max-w-none">
                                            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed bg-transparent p-0 border-none selection:bg-primary-500/30">
                                                {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default AiLab;
