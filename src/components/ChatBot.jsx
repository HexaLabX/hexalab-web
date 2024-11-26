import { useState, useRef, useEffect, useContext } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import stringSimilarity from "string-similarity";
import ThemeContext from "../context/ThemeContext"; // Mengimpor ThemeContext

function ChatBot() {
    const { darkMode } = useContext(ThemeContext); // Mengakses darkMode dari ThemeContext
    const [input, setInput] = useState(""); // State untuk input pengguna
    const [messages, setMessages] = useState([]); // State untuk pesan
    const messagesEndRef = useRef(null); // Reference untuk scroll ke bawah
    const responses = {
        halo: "Halo! Apa kabar?",
        "apa kabar": "Saya baik, terima kasih! Bagaimana dengan Anda?",
        "siapa kamu": "Saya adalah chatbot sederhana yang siap membantu Anda.",
        "terima kasih": "Sama-sama! Ada yang bisa saya bantu lagi?",
        "selamat tinggal": "Sampai jumpa! Semoga harimu menyenangkan!",
    };

    // Fungsi untuk mencocokkan respons berdasarkan kesamaan string
    const findResponse = (userMessage) => {
        const keys = Object.keys(responses);
        const match = stringSimilarity.findBestMatch(userMessage, keys);
        return match.bestMatch.rating > 0.5
            ? responses[match.bestMatch.target]
            : "Maaf, saya tidak mengerti pertanyaan Anda.";
    };

    // Fungsi untuk mengirim pesan dan menambahkan respons
    const handleSendMessage = (e) => {
        e.preventDefault();

        if (input.trim() === "") return; // Jangan kirim pesan kosong

        const userMessage = input.trim().toLowerCase(); // Input pengguna
        const botResponse = findResponse(userMessage); // Dapatkan respons dari chatbot

        setMessages((prev) => [
            ...prev,
            { sender: "user", text: input },
            { sender: "bot", text: botResponse },
        ]);

        setInput(""); // Reset input
    };

    // Menyelesaikan scroll otomatis ke bawah setiap kali pesan baru ditambahkan
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div
            className={`flex items-center justify-center h-screen p-4 ${
                darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
            }`}
        >
            <div
                className={`w-full max-w-4xl shadow-lg rounded-lg flex flex-col h-full md:h-5/6 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                }`}
            >
                {/* Header */}
                <div
                    className={`p-4 flex items-center justify-between rounded-t-lg ${
                        darkMode ? "bg-gray-700" : "bg-blue-500"
                    }`}
                >
                    <h1 className="text-lg font-bold flex items-center">
                        <FaRobot className="mr-2" />
                        ChatBot
                    </h1>
                </div>

                {/* Chat Messages */}
                <div
                    className={`flex-1 overflow-y-auto p-4 ${
                        darkMode ? "bg-gray-800" : "bg-gray-50"
                    }`}
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                msg.sender === "user" ? "justify-end" : "justify-start"
                            } mb-3`}
                        >
                            <div
                                className={`px-4 py-2 rounded-lg max-w-xs ${
                                    msg.sender === "user"
                                        ? darkMode
                                            ? "bg-blue-500 text-white"
                                            : "bg-blue-600 text-white"
                                        : darkMode
                                        ? "bg-gray-700 text-gray-200"
                                        : "bg-gray-300 text-gray-800"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Field */}
                <form
                    onSubmit={handleSendMessage}
                    className={`flex items-center p-4 border-t ${
                        darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-200"
                    }`}
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ketik pesan..."
                        className={`flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            darkMode
                                ? "bg-gray-800 text-gray-200 border-gray-700"
                                : "bg-white text-gray-800 border-gray-300"
                        }`}
                    />
                    <button
                        type="submit"
                        className={`ml-2 p-3 rounded-lg flex items-center ${
                            darkMode
                                ? "bg-blue-500 hover:bg-blue-600 text-white"
                                : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                    >
                        <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChatBot;
