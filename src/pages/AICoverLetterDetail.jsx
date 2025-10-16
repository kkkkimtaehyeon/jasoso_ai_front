import {useState, useEffect, useRef} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {ArrowLeft, Save, ArrowClockwise, FileText, Plus, Link as LinkIcon} from 'react-bootstrap-icons'
import './AICoverLetterDetail.css'
import CoverLetterItemList from "../components/CoverLetterItemList.jsx";
import api from "../common/api-axios";

// similarResumes mock 데이터 추가
const similarResumes = [
    {
        id: 1,
        question: "What are your strengths?",
        company: "Tech Innovations Inc.",
        content: "My key strengths include strong analytical thinking, excellent problem-solving skills, and the ability to work effectively in team environments. I have demonstrated these strengths through various projects where I successfully identified and resolved complex technical challenges. My communication skills allow me to explain technical concepts clearly to both technical and non-technical stakeholders.",
        icon: "📊"
    },
    {
        id: 2,
        question: "Describe a challenging project and how you overcame it.",
        company: "Global Solutions Ltd.",
        content: "I led a critical software migration project that was initially behind schedule. The main challenge was coordinating between multiple teams and managing stakeholder expectations. I restructured the project timeline, implemented daily stand-up meetings, and established clear communication channels. Through these efforts, we completed the project on time and received positive feedback from all stakeholders.",
        icon: "🌱"
    },
    {
        id: 3,
        question: "Why are you interested in this role?",
        company: "Future Dynamics Corp.",
        content: "I am passionate about leveraging technology to solve real-world problems and drive innovation. This role aligns perfectly with my career goals and allows me to work with cutting-edge technologies while contributing to meaningful projects. The company's commitment to sustainability and innovation resonates with my personal values, and I believe I can make a significant contribution to the team's success.",
        icon: "🌊"
    }
]

const AICoverLetterDetail = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [currentItemIndex, setCurrentItemIndex] = useState(0)
    const [isEditing, setIsEditing] = useState(true)
    const [isRegenerating, setIsRegenerating] = useState(false)
    const [expandedCard, setExpandedCard] = useState(null)
    const [coverLetter, setCoverLetter] = useState({
        id: id,
        title: '',
        jobUrl: '',
        guide: '',
        items: []
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [editingContent, setEditingContent] = useState(coverLetter.items[0]?.content || '')

    // 상세 조회
    useEffect(() => {
        let mounted = true
        setLoading(true)
        setError(null)
        api.get(`/v2/ai-cover-letters/${id}`)
            .then(({data}) => {
                if (!mounted) return
                const mapped = {
                    id: data.id,
                    title: data.title,
                    jobUrl: data.job_posting_url,
                    guide: data.guide,
                    items: (data.items || []).map(item => ({
                        id: item.id,
                        numbers: item.numbers,
                        question: item.question,
                        content: '',
                        char_limit: item.char_limit,
                        similar_questions: item.similar_questions || []
                    }))
                }
                setCoverLetter(mapped)
                setCurrentItemIndex(0)
                setIsEditing(true)
                setExpandedCard(null)
            })
            .catch(err => {
                if (!mounted) return
                setError(err?.response?.data?.detail || '불러오기에 실패했습니다.')
            })
            .finally(() => {
                if (!mounted) return
                setLoading(false)
            })
        return () => {
            mounted = false
        }
    }, [id])

    // 아이템 전환 시 에디팅 내용 동기화
    useEffect(() => {
        setEditingContent(coverLetter.items[currentItemIndex]?.content || '')
        setExpandedCard(null)
    }, [currentItemIndex, coverLetter.items])

    const handleSave = () => {
        const newItems = [...coverLetter.items]
        newItems[currentItemIndex].content = editingContent
        setCoverLetter({...coverLetter, items: newItems})
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditingContent(coverLetter.items[currentItemIndex]?.content || '')
        setIsEditing(false)
    }

    const handleRegenerate = () => {
        setIsRegenerating(true)
        setTimeout(() => {
            const newContent = `AI가 재생성한 ${coverLetter.items[currentItemIndex].question}에 대한 새로운 답변입니다. 이는 실제 AI 생성 결과가 아닌 시뮬레이션입니다. 실제 구현에서는 AI API를 연동하여 진짜 자소서를 생성합니다.`
            const newItems = [...coverLetter.items]
            newItems[currentItemIndex].content = newContent
            setCoverLetter({...coverLetter, items: newItems})
            setEditingContent(newContent)
            setIsRegenerating(false)
        }, 2000)
    }

    const handleCardClick = (cardId) => {
        setExpandedCard(expandedCard === cardId ? null : cardId)
    }

    // "이 내용 사용하기" → 현재 항목 textarea에 줄바꿈 후 추가
    const handleUseContent = (content) => {
        setEditingContent(prev => (prev ? prev + '\n' + content : content));
        setIsEditing(true);
    }

    const currentItem = coverLetter.items[currentItemIndex]

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* 메인 콘텐츠 */}
            <main className="flex-1 w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {loading && (
                    <div className="lg:col-span-3 text-center text-slate-600">불러오는 중...</div>
                )}
                {!loading && error && (
                    <div className="lg:col-span-3 text-center text-red-600">{error}</div>
                )}
                {/* 좌측 사이드바 - AI 가이드 */}
                <aside
                    className="lg:col-span-1 bg-white rounded-lg border border-slate-200 flex flex-col max-h-[calc(100vh-120px)]">
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-2">작성 가이드</h3>
                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                    {coverLetter.guide || '가이드가 없습니다.'}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-4">유사한 질문</h3>
                                <div className="space-y-3">

                                    {(currentItem?.similar_questions || []).map((sq) => (
                                        <div key={sq.id} className="transition-all duration-300">
                                            <div
                                                className="flex gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                                                onClick={() => handleCardClick(sq.id)}
                                            >
                                                <div className="flex-grow">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-semibold text-slate-800 mt-1">{sq.question}</p>
                                                    </div>
                                                    {!!sq.title && (
                                                        <>
                                                        <span
                                                            className="mt-1 inline-block text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                                                {sq.title}
                                                            </span>
                                                            <span className="text-xs text-slate-500 ml-2 mt-1">
                                                            {sq.similarity}% 유사
                                                                </span>
                                                        </>

                                                    )}
                                                </div>
                                            </div>
                                            {/* 펼쳐진 내용 */}
                                            {expandedCard === sq.id && (
                                                <div
                                                    className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-in slide-in-from-top-2 duration-300">
                                                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{sq.content}</p>
                                                    <div className="mt-3 flex gap-2">
                                                        <button
                                                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                handleUseContent(sq.content);
                                                            }}
                                                        >
                                                            이 내용 사용하기
                                                        </button>
                                                        <button
                                                            className="px-3 py-1 text-xs bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                setExpandedCard(null);
                                                            }}
                                                        >
                                                            닫기
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                {/* 메인 콘텐츠 영역 */}
                <section className="lg:col-span-2 bg-white rounded-lg p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">{coverLetter.title || '자소서 항목'}</h2>
                        {/* 채용공고 URL 추가 */}
                        {coverLetter.jobUrl && (
                            <a
                                href={coverLetter.jobUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-600 underline hover:text-blue-800 text-sm"
                            >
                                <LinkIcon size={16}/>
                                채용공고 바로가기
                            </a>
                        )}
                    </div>
                    {/* 항목 번호 선택 (numbers 기준) */}
                    {coverLetter.items?.length > 0 && (
                        <div className="flex items-center gap-2 mb-6 flex-wrap">
                            {[...coverLetter.items]
                                .sort((a, b) => (a.numbers ?? 0) - (b.numbers ?? 0))
                                .map((item, idx) => {
                                    const active = coverLetter.items[currentItemIndex]?.id === item.id
                                    const label = item.numbers ?? (idx + 1)
                                    return (
                                        <button
                                            key={item.id}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg transition-colors ${
                                                active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                                            }`}
                                            onClick={() => {
                                                setExpandedCard(null)
                                                const indexToSelect = coverLetter.items.findIndex(ci => ci.id === item.id)
                                                if (indexToSelect >= 0) setCurrentItemIndex(indexToSelect)
                                            }}
                                            type="button"
                                        >
                                            {label}
                                        </button>
                                    )
                                })}
                        </div>
                    )}
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="question">
                                질문
                            </label>
                            <h3 className="text-lg font-semibold text-slate-900 bg-slate-100 rounded-lg px-4 py-3">
                                {currentItem?.question}
                            </h3>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="content">
                                내용
                            </label>
                            {isEditing ? (
                                <textarea
                                    className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
                                    id="content"
                                    placeholder="여기에 내용을 입력하세요..."
                                    rows={12}
                                    value={editingContent}
                                    onChange={e => setEditingContent(e.target.value)}
                                />
                            ) : (
                                <textarea
                                    className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
                                    id="content"
                                    placeholder="여기에 내용을 입력하세요..."
                                    rows={12}
                                    value={currentItem?.content || ""}
                                    readOnly
                                />
                            )}
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-slate-500">
                                    글자수: {isEditing ? editingContent.length : (currentItem?.content?.length || 0)} / {currentItem?.wordLimit || 500}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Save className="inline mr-2" size={16}/>
                                저장
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    )
}

export default AICoverLetterDetail
