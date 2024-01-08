import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OutputBox = ({ summary }: {
    summary: string
}) => {
    const [wordCount, setWordCount] = useState(0);
    const [sentCount, setSentCount] = useState(0);

    useEffect(() => {
        countWords();
        countSentences();
    }, [summary]);

    const handleCopyToClipboard = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(summary)
                .then(() => {
                    toast.success('Text successfully copied to clipboard');
                })
                .catch(err => {
                    toast.error('Error copying text to clipboard:', err);
                });
        } else {
            // Fallback for browsers that do not support the Clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = summary;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            toast.success('Text successfully copied to clipboard');
        }
    };

    const countWords = () => {
        const newWordCount = summary.trim().split(/\s+/).filter((word: string) => word !== '').length;
        setWordCount(newWordCount);
    };
    const countSentences = () => {
        const sentences = summary.split(/[.?!]/g);
        const filteredSentences = sentences.filter(sentence => sentence.trim() !== "");

        setSentCount(filteredSentences.length);
    };


    return (
        <div className="bg-white p-5 flex flex-col justify-between w-full h-full">
            <textarea
                className="focus:outline-none resize-none w-full overflow-y-scroll"
                name="original" id="original" cols={75} rows={15}
                placeholder="To summarize your text, enter or paste it here and press “Summarize.”"
                value={summary}
            >
                {summary}
            </textarea>
            <div className="flex justify-between items-center text-sm">
                <div className="flex justify-center items-center">
                    <span className="font-semibold text-center">{sentCount} Sentences</span>
                    <svg className="mx-2 mt-1" width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 3C6.5 4.65685 5.15685 6 3.5 6C1.84315 6 0.5 4.65685 0.5 3C0.5 1.34315 1.84315 0 3.5 0C5.15685 0 6.5 1.34315 6.5 3Z" fill="#1E1E1E" />
                    </svg>
                    <span className="font-semibold text-center">
                        {wordCount} Words
                    </span>
                </div>
                <button onClick={handleCopyToClipboard} className="px-2 py-2">
                    <svg className="my-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2_67)">
                            <path d="M19.6667 4.66663H7C6.73478 4.66663 6.48043 4.77198 6.29289 4.95952C6.10536 5.14706 6 5.40141 6 5.66663V21.6666C6 21.9318 6.10536 22.1862 6.29289 22.3737C6.48043 22.5613 6.73478 22.6666 7 22.6666H19.6667C19.9319 22.6666 20.1862 22.5613 20.3738 22.3737C20.5613 22.1862 20.6667 21.9318 20.6667 21.6666V5.66663C20.6667 5.40141 20.5613 5.14706 20.3738 4.95952C20.1862 4.77198 19.9319 4.66663 19.6667 4.66663ZM19.3333 21.3333H7.33333V5.99996H19.3333V21.3333Z" fill="#8D8D8D" />
                            <path d="M17.3334 2.33337C17.3334 2.06816 17.2281 1.8138 17.0405 1.62627C16.853 1.43873 16.5986 1.33337 16.3334 1.33337H3.66675C3.40153 1.33337 3.14718 1.43873 2.95964 1.62627C2.7721 1.8138 2.66675 2.06816 2.66675 2.33337V18.3334C2.66675 18.5986 2.7721 18.8529 2.95964 19.0405C3.14718 19.228 3.40153 19.3334 3.66675 19.3334H4.00008V2.66671H17.3334V2.33337Z" fill="#8D8D8D" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2_67">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default OutputBox