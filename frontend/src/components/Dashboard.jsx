import React, { useEffect, useState, useContext } from "react";
import axios from "../api/Axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const CopyIcon = ({ copied }) => copied ? (
  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
) : (
  <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15V5a2 2 0 012-2h10" /></svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5 text-red-500 hover:text-red-700 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState("");
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/auth/profile");
      setLinks(res.data.data.links || []);
    } catch (err) {
      toast.error("Failed to fetch links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
    // eslint-disable-next-line
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await axios.post("/links", { originalUrl: newUrl });
      toast.success("Link created!");
      setNewUrl("");
      setLinks((prev) => [res.data.data, ...prev]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create link");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this link?")) return;
    try {
      await axios.delete(`/links/${id}`);
      toast.success("Link deleted");
      setLinks((prev) => prev.filter((l) => l.shortUrl !== id));
    } catch (err) {
      toast.error("Failed to delete link");
    }
  };

  const handleCopy = (shortUrl) => {
    const fullUrl = `http://localhost:5000/${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(shortUrl);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 1200);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="backdrop-blur-xl bg-black dark:bg-black rounded-2xl shadow-2xl p-8 max-w-3xl w-full mx-auto mb-8 border border-white/10 mt-12">
        {/* Hero/Info Section */}
        <div className="mb-10 animate-fadein">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center font-satoshi text-white">Your Links Dashboard</h2>
          <p className="text-gray-300 text-center mb-2 font-inter text-lg">Shorten, manage, and share your links with ease. All your links are listed below. Click the copy button to share your short URL instantly!</p>
          <div className="flex justify-center mb-2">
            <span className="inline-block bg-gray-800 text-gray-200 px-4 py-1 rounded-full text-xs font-mono tracking-wide animate-pulse">New: Copy your short URL with one click!</span>
          </div>
        </div>
        {/* Modern link input area */}
        <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center">
          <div className="relative w-full sm:w-2/3">
            <input
              type="url"
              id="link-input"
              placeholder=" "
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="peer w-full px-6 py-4 rounded-full bg-zinc-900 border border-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-white text-lg font-geist text-white placeholder-transparent transition-all duration-200"
              required
              autoComplete="off"
            />
            <label htmlFor="link-input" className="absolute left-6 top-1/2 -translate-y-1/2 text-lg font-satoshi text-gray-500 pointer-events-none transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-white peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-500">
              Paste a long URL...
            </label>
          </div>
          <button
            type="submit"
            className="px-8 py-4 rounded-full bg-white text-black font-satoshi font-bold text-lg shadow hover:bg-gray-200 transition disabled:opacity-60 border-0 outline-none"
            disabled={creating}
          >
            {creating ? "Shortening..." : <span className="font-bold">Shorten</span>}
          </button>
        </form>
        {loading ? (
          <div className="text-gray-400 text-center py-8 animate-fadein">Loading your links...</div>
        ) : links.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 animate-fadein">
            <svg width="64" height="64" fill="none" className="mb-4 opacity-20" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="2" rx="1" fill="#e5e7eb"/><rect x="11" y="3" width="2" height="18" rx="1" fill="#e5e7eb"/></svg>
            <div className="text-gray-400 text-center text-lg">No links yet. Create your first short link above!</div>
            <div className="text-gray-500 text-sm mt-2">Your links will appear here after you create them.</div>
          </div>
        ) : (
          <div className="overflow-x-auto animate-fadein">
            <table className="min-w-full bg-black dark:bg-black rounded shadow-lg">
              <thead>
                <tr className="bg-zinc-900 dark:bg-zinc-900">
                  <th className="py-3 px-4 text-left font-satoshi text-lg text-white">Short URL</th>
                  <th className="py-3 px-4 text-left font-satoshi text-lg text-white">Original URL</th>
                  <th className="py-3 px-4 text-left font-satoshi text-lg text-white">Clicks</th>
                  <th className="py-3 px-4 text-left font-satoshi text-lg text-white">Created</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link._id} className="border-b border-gray-800 hover:bg-zinc-800/70 transition group">
                    <td className="py-2 px-4 font-inter text-white text-lg font-bold flex items-center gap-2">
                      <a href={`http://localhost:5000/${link.shortUrl}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-blue-400 transition">
                        {link.shortUrl}
                      </a>
                      <button
                        onClick={() => handleCopy(link.shortUrl)}
                        className={`ml-2 p-1 rounded bg-zinc-800 border border-gray-700 hover:bg-zinc-700 transition group flex items-center justify-center ${copiedId === link.shortUrl ? 'ring-2 ring-green-400' : ''}`}
                        title="Copy short URL"
                        type="button"
                        aria-label="Copy short URL"
                      >
                        <CopyIcon copied={copiedId === link.shortUrl} />
                      </button>
                    </td>
                    <td className="py-2 px-4 font-inter truncate max-w-xs text-gray-300" title={link.originalUrl}>{link.originalUrl}</td>
                    <td className="py-2 px-4 font-inter text-center text-gray-300">{link.clicks}</td>
                    <td className="py-2 px-4 font-inter text-gray-500 text-sm">{new Date(link.createdAt).toLocaleDateString()}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDelete(link.shortUrl)}
                        className="p-1 rounded flex items-center justify-center"
                        title="Delete link"
                        aria-label="Delete link"
                        type="button"
                      >
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 