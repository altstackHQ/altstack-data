'use client'

import { useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1000))

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        // Construct mailto link as fallback since we don&apos;t have a backend
        const subject = encodeURIComponent(`Contact Form: ${data.subject}`)
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)

        window.location.href = `mailto:hello@thealtstack.com?subject=${subject}&body=${body}`

        setIsLoading(false)
        setStatus('success')
    }

    return (
        <div className="w-full max-w-2xl mx-auto mt-12 font-sans selection:bg-red-500/30">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full bg-black border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-2xl"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-white mb-4">
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Touch</span>
                    </h2>
                    <p className="text-slate-400 font-light">
                        Have a question regarding self-hosting or the AltStack? We&apos;re here to help.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-xs font-mono uppercase text-slate-500 tracking-wider">Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs font-mono uppercase text-slate-500 tracking-wider">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
                                placeholder="jane@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="subject" className="text-xs font-mono uppercase text-slate-500 tracking-wider">Subject</label>
                        <select
                            id="subject"
                            name="subject"
                            className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all appearance-none cursor-pointer"
                            style={{ colorScheme: 'dark' }}
                        >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Support">Support Request</option>
                            <option value="Feedback">Feedback</option>
                            <option value="Partnership">Partnership</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-mono uppercase text-slate-500 tracking-wider">Message *</label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all resize-none"
                            placeholder="How can we help you?"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Sending...</span>
                            </>
                        ) : (
                            <>
                                <span>Send Message</span>
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>

                    {status === 'success' && (
                        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center font-medium animate-in fade-in slide-in-from-bottom-2">
                            🚀 Message prepared! Opening your email client...
                        </div>
                    )}
                </form>
            </motion.div>
        </div>
    )
}
