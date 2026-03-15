import { motion } from "framer-motion";

export function FeatureCard({ icon: Icon, title, text, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="soft-card p-5"
    >
      <div className="mb-3 inline-flex rounded-xl border border-sky-300/30 bg-sky-200/10 p-2 text-sky-300">
        <Icon size={20} />
      </div>
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="text-sm text-slate-300">{text}</p>
    </motion.article>
  );
}
