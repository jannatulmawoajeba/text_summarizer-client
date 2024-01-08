import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import storiesData from '../static/examples.json';


const InputBox = ({ setSummary }: {
    setSummary: any
}) => {
    const [text, setText] = useState("");
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        countWords();
    }, [text]);

    const countWords = () => {
        const newWordCount = text.trim().split(/\s+/).filter((word: string) => word !== '').length;
        setWordCount(newWordCount);
    };

    const handleChange = (e: any) => {
        const newText = e.target.value;
        setText(newText);
    };

    const handleDelete = () => {
        setText("");
    };

    const handleSummarize = async () => {
        try {
            const response = await fetch('https://7ie34x9xle.execute-api.us-west-2.amazonaws.com/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input_text: text }),
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            setSummary(data.result);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePasteFromClipboard = async () => {
        try {
            const textFromClipboard = await navigator.clipboard.readText();
            setText(textFromClipboard);

            toast.success('Text successfully pasted from clipboard');
        } catch (error) {
            toast.error('Error pasting text from clipboard');
        }
    };

    const handleRandomStory = () => {
        const randomIndex = Math.floor(Math.random() * storiesData.length);
        const randomStory = storiesData[randomIndex];
        setText(randomStory.content);
    };
    return (
        <div className="relative bg-white w-full h-full p-5 flex flex-col justify-between">
            <div className="flex">
                <textarea
                    className="focus:outline-none resize-none w-full overflow-y-scroll"
                    name="text" id="text" cols={70} rows={15}
                    placeholder="To summarize your text, enter or paste it here and press “Summarize.”"
                    onChange={handleChange}
                    value={text}
                >
                    {text}
                </textarea>

                {/* Summarize button */}
                {
                    wordCount !== 0 && (

                        <button onClick={handleDelete} className="h-5 m-2">
                            <svg className="my-icon" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="#8D8D8D" />
                            </svg>
                        </button>
                    )
                }
            </div>
            {/* Words count */}
            <div className="flex justify-between items-center text-sm">
                {
                    wordCount !== 0 ? (
                        <span className="font-semibold text-center">{wordCount} {wordCount === 1 ? `Word` : `Words`}</span>
                    ) : (
                        <span className="font-semibold text-center"></span>
                    )
                }
                <button
                    onClick={handleSummarize}
                    className="rounded-full px-6 py-2 text-lg font-semibold bg-green hover:bg-light_green active:bg-green_secondary text-white"
                >Summarize</button>
            </div>

            {/* Paste and Sample buttons */}
            {
                wordCount == 0 && (
                    <div className="flex absolute left-40 top-40">
                        <button onClick={handleRandomStory}>
                            <div className="mx-2 flex flex-col justify-center items-center w-32 h-20 p-2 border-green border rounded-lg">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M28.75 21.25C28.75 25.3875 25.3875 28.75 21.25 28.75V26.875C24.375 26.875 26.875 24.375 26.875 21.25H28.75ZM1.25002 8.75C1.25002 4.6125 4.61252 1.25 8.75002 1.25V3.125C5.62502 3.125 3.12502 5.625 3.12502 8.75H1.25002ZM10 5.4L4.26252 11.15C0.237524 15.175 0.237524 21.7125 4.26252 25.7375C8.28752 29.7625 14.825 29.7625 18.85 25.7375L27.6875 16.875C28.3 16.2875 28.3 15.3 27.6875 14.6875C27.5424 14.542 27.37 14.4265 27.1801 14.3478C26.9903 14.269 26.7868 14.2285 26.5813 14.2285C26.3757 14.2285 26.1722 14.269 25.9824 14.3478C25.7926 14.4265 25.6202 14.542 25.475 14.6875L19.95 20.2125L19.0625 19.325L27.2375 11.15C27.85 10.5375 27.85 9.55 27.2375 8.9375C26.625 8.325 25.625 8.325 25 8.9375L17.7375 16.25L16.875 15.3375L25.4625 6.725C26.075 6.1125 26.075 5.125 25.4625 4.5125C24.85 3.9 23.8625 3.9 23.25 4.5125L14.6375 13.125L13.75 12.25L20.625 5.4C21.25 4.7875 21.25 3.8 20.625 3.1875C20 2.575 19.025 2.575 18.4125 3.1875L8.88752 12.7125C9.63333 13.6745 10.0029 14.8755 9.92694 16.0904C9.851 17.3053 9.33481 18.4508 8.47502 19.3125L7.58752 18.425C8.28978 17.7219 8.68422 16.7688 8.68422 15.775C8.68422 14.7812 8.28978 13.8281 7.58752 13.125L7.15002 12.6875L12.2375 7.6C12.85 6.9875 12.85 6 12.2375 5.3875C11.6125 4.7875 10.625 4.7875 10 5.4Z" fill="#FED45A" />
                                </svg>
                                <span className="italic text-green text-xs">Try Sample Text</span>
                            </div>
                        </button>
                        <button onClick={handlePasteFromClipboard}>
                            <div className="mx-2 flex flex-col justify-center items-center w-32 h-20 p-2 border-green border rounded-lg">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.75 2.5H18.525C18 1.05 16.625 0 15 0C13.375 0 12 1.05 11.475 2.5H6.25C4.875 2.5 3.75 3.625 3.75 5V25C3.75 26.375 4.875 27.5 6.25 27.5H23.75C25.125 27.5 26.25 26.375 26.25 25V5C26.25 3.625 25.125 2.5 23.75 2.5ZM15 2.5C15.6875 2.5 16.25 3.0625 16.25 3.75C16.25 4.4375 15.6875 5 15 5C14.3125 5 13.75 4.4375 13.75 3.75C13.75 3.0625 14.3125 2.5 15 2.5ZM23.75 25H6.25V5H8.75V8.75H21.25V5H23.75V25Z" fill="#499557" />
                                </svg>

                                <span className="italic text-green text-xs">Paste Text</span>
                            </div>
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default InputBox