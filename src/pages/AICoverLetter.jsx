// import { useState } from 'react'
// import { Plus, Bot, Link as LinkIcon, FileText, Wand2, Calendar, Edit, Trash2 } from 'lucide-react'
// import './AICoverLetter.css'
// import {useNavigate} from "react-router-dom";
//
// const AICoverLetter = () => {
//   const [activeTab, setActiveTab] = useState('list') // 'list' 또는 'create'
//   const [jobUrl, setJobUrl] = useState('')
//   const navigate = useNavigate();
//   const [items, setItems] = useState([
//     { question: '', wordLimit: 500 }
//   ])
//   const [isGenerating, setIsGenerating] = useState(false)
//   const [generatedContent, setGeneratedContent] = useState(null)
//   const [aiCoverLetters, setAiCoverLetters] = useState([
//     {
//       id: 1,
//       title: '카카오 AI 자소서',
//       date: '2024-01-12',
//       jobUrl: 'https://careers.kakao.com/jobs/P-12345',
//       items: [
//         {
//           question: '성장과정',
//           content: '대학 시절 컴퓨터공학을 전공하면서 다양한 프로젝트를 통해 실무 경험을 쌓았습니다. 특히 졸업 작품으로 개발한 IoT 기반 스마트팜 시스템을 통해 하드웨어와 소프트웨어의 융합 기술에 대한 깊은 이해를 얻었습니다.',
//           wordLimit: 500
//         },
//         {
//           question: '지원동기',
//           content: '카카오의 혁신적인 기술과 사용자 중심의 서비스 철학에 깊이 공감합니다. 특히 AI 기술을 통해 더 나은 사용자 경험을 제공하는 카카오의 비전에 함께하고 싶습니다.',
//           wordLimit: 400
//         }
//       ]
//     },
//     {
//       id: 2,
//       title: '네이버 AI 자소서',
//       date: '2024-01-08',
//       jobUrl: 'https://recruit.navercorp.com/job/12345',
//       items: [
//         {
//           question: '지원동기',
//           content: '네이버의 혁신적인 기술과 사용자 중심의 서비스 철학에 깊이 공감합니다. 특히 AI 기술을 통해 더 나은 사용자 경험을 제공하는 네이버의 비전에 함께하고 싶습니다.',
//           wordLimit: 400
//         }
//       ]
//     }
//   ])
//
//   const addItem = () => {
//     setItems(prev => [...prev, { question: '', wordLimit: 500 }])
//   }
//
//   const removeItem = (index) => {
//     if (items.length > 1) {
//       setItems(prev => prev.filter((_, i) => i !== index))
//     }
//   }
//
//   const updateItem = (index, field, value) => {
//     setItems(prev => prev.map((item, i) =>
//       i === index ? { ...item, [field]: value } : item
//     ))
//   }
//
//   const handleGenerate = async () => {
//     if (!jobUrl.trim()) {
//       alert('채용공고 URL을 입력해주세요.')
//       return
//     }
//
//     const validItems = items.filter(item => item.question.trim())
//     if (validItems.length === 0) {
//       alert('최소 하나의 질문을 입력해주세요.')
//       return
//     }
//
//     setIsGenerating(true)
//
//     // AI 자소서 생성 시뮬레이션
//     setTimeout(() => {
//       const mockContent = validItems.map((item, index) => ({
//         question: item.question,
//         content: `AI가 생성한 ${item.question}에 대한 답변입니다. 이는 실제 AI 생성 결과가 아닌 시뮬레이션입니다. 실제 구현에서는 AI API를 연동하여 진짜 자소서를 생성합니다. 글자수 제한: ${item.wordLimit}자`,
//         wordLimit: item.wordLimit
//       }))
//
//       setGeneratedContent(mockContent)
//       setIsGenerating(false)
//     }, 3000)
//   }
//
//   const handleSave = () => {
//     if (generatedContent) {
//       const newCoverLetter = {
//         id: Date.now(),
//         title: `AI 자소서 ${new Date().toLocaleDateString()}`,
//         date: new Date().toISOString().split('T')[0],
//         jobUrl: jobUrl,
//         items: generatedContent
//       }
//       setAiCoverLetters(prev => [newCoverLetter, ...prev])
//       alert('AI 자소서가 저장되었습니다!')
//       setGeneratedContent(null)
//       setJobUrl('')
//       setItems([{ question: '', wordLimit: 500 }])
//       setActiveTab('list')
//     }
//   }
//
//   const handleViewDetail = (coverLetter) => {
//     navigate(`/ai-cover-letter/${coverLetter.id}`)
//   }
//
//   return (
//     <div className="ai-cover-letter">
//       <div className="page-header">
//         <div className="page-title">
//         </div>
//         <div className="header-tabs">
//           <button
//             className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
//             onClick={() => setActiveTab('list')}
//           >
//             <FileText size={18} />
//             AI 자소서 목록
//           </button>
//           <button
//             className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
//             onClick={() => setActiveTab('create')}
//           >
//             <Wand2 size={18} />
//             AI 자소서 생성
//           </button>
//         </div>
//       </div>
//
//       {activeTab === 'list' ? (
//         <div className="ai-cover-letter-list">
//           {aiCoverLetters.length === 0 ? (
//             <div className="empty-state">
//               <Bot size={48} />
//               <h3>AI 자소서가 없습니다</h3>
//               <p>새로운 AI 자소서를 생성해보세요</p>
//               <button
//                 className="create-btn"
//                 onClick={() => setActiveTab('create')}
//               >
//                 <Wand2 size={20} />
//                 AI 자소서 생성하기
//               </button>
//             </div>
//           ) : (
//             aiCoverLetters.map(coverLetter => (
//               <div key={coverLetter.id} className="cover-letter-item">
//                 <div className="cover-letter-info" onClick={() => handleViewDetail(coverLetter)} style={{ cursor: 'pointer' }}>
//                   <h3 className="cover-letter-title">{coverLetter.title}</h3>
//                   <div className="cover-letter-meta">
//                     <span className="date">
//                       <Calendar size={16} />
//                       {coverLetter.date}
//                     </span>
//                     <span className="item-count">
//                       {coverLetter.items.length}개 항목
//                     </span>
//                   </div>
//                   <div className="job-url">
//                     <LinkIcon size={14} />
//                     {coverLetter.jobUrl}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       ) : !generatedContent ? (
//         <div className="generation-form">
//           <div className="form-section">
//             <h2>채용공고 정보</h2>
//             <div className="form-group">
//               <label htmlFor="jobUrl">
//                 <LinkIcon size={16} />
//                 채용공고 URL
//               </label>
//               <input
//                 type="url"
//                 id="jobUrl"
//                 value={jobUrl}
//                 onChange={(e) => setJobUrl(e.target.value)}
//                 placeholder="https://example.com/job-posting"
//                 required
//               />
//             </div>
//           </div>
//
//           <div className="form-section">
//             <h2>자기소개서 항목</h2>
//             <div className="items-container">
//               {items.map((item, index) => (
//                 <div key={index} className="item-card">
//                   <div className="item-header">
//                     <span className="item-number">항목 {index + 1}</span>
//                     {items.length > 1 && (
//                       <button
//                         type="button"
//                         className="remove-item-btn"
//                         onClick={() => removeItem(index)}
//                       >
//                         ×
//                       </button>
//                     )}
//                   </div>
//                   <div className="item-fields">
//                     <div className="field-group">
//                       <label>질문</label>
//                       <input
//                         type="text"
//                         value={item.question}
//                         onChange={(e) => updateItem(index, 'question', e.target.value)}
//                         placeholder="예: 지원동기를 작성해주세요"
//                         required
//                       />
//                     </div>
//                     <div className="field-group">
//                       <label>글자수 제한</label>
//                       <input
//                         type="number"
//                         value={item.wordLimit}
//                         onChange={(e) => updateItem(index, 'wordLimit', parseInt(e.target.value) || 500)}
//                         min="100"
//                         max="2000"
//                         step="50"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button
//               type="button"
//               className="add-item-btn"
//               onClick={addItem}
//             >
//               <Plus size={16} />
//               항목 추가하기
//             </button>
//           </div>
//
//           <div className="form-actions">
//             <button
//               className="generate-btn"
//               onClick={handleGenerate}
//               disabled={isGenerating}
//             >
//               {isGenerating ? (
//                 <>
//                   <div className="spinner"></div>
//                   AI 자소서 생성 중...
//                 </>
//               ) : (
//                 <>
//                   <Wand2 size={20} />
//                   자소서 생성하기
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="generated-content">
//           <div className="content-header">
//             <h2>생성된 AI 자소서</h2>
//             <div className="content-actions">
//               <button className="regenerate-btn" onClick={() => setGeneratedContent(null)}>
//                 다시 생성
//               </button>
//               <button className="save-btn" onClick={handleSave}>
//                 <FileText size={16} />
//                 저장하기
//               </button>
//             </div>
//           </div>
//
//           <div className="generated-items">
//             {generatedContent.map((item, index) => (
//               <div key={index} className="generated-item">
//                 <h3 className="question">{item.question}</h3>
//                 <div className="content">
//                   <p>{item.content}</p>
//                   <div className="word-count">
//                     글자수: {item.content.length} / {item.wordLimit}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
//
// export default AICoverLetter

import { useState, useEffect } from 'react'
import { Plus, Bot, Link as LinkIcon, FileText, Wand2, Calendar, Edit, Trash2 } from 'lucide-react'
import './AICoverLetter.css'
import {useNavigate} from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import CoverLetterList from "../components/CoverLetterList.jsx";
import api from "../common/api-axios";

const AICoverLetter = () => {
  const [activeTab, setActiveTab] = useState('list') // 'list' 또는 'create'
  const [jobUrl, setJobUrl] = useState('')
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { question: '', wordLimit: 500 }
  ])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState(null)
  const [aiCoverLetters, setAiCoverLetters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    api.get('/v2/ai-cover-letters')
      .then(({data}) => {
        if (!mounted) return
        const mapped = (data || []).map(item => ({
          id: item.id,
          title: item.title,
          date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : '',
          jobUrl: item.job_posting_url
        }))
        setAiCoverLetters(mapped)
      })
      .catch(err => {
        if (!mounted) return
        setError(err?.response?.data?.detail || '목록을 불러오지 못했습니다.')
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })
    return () => { mounted = false }
  }, [])

  const addItem = () => {
    setItems(prev => [...prev, { question: '', wordLimit: 500 }])
  }

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(prev => prev.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index, field, value) => {
    setItems(prev => prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
    ))
  }

  const handleGenerate = async () => {
    if (!jobUrl.trim()) {
      alert('채용공고 URL을 입력해주세요.')
      return
    }

    const validItems = items
      .map((it, idx) => ({ ...it, _idx: idx }))
      .filter(item => item.question.trim())
    if (validItems.length === 0) {
      alert('최소 하나의 질문을 입력해주세요.')
      return
    }

    setIsGenerating(true)
    try {
      const body = {
        job_posting_url: jobUrl,
        items: validItems.map((item, index) => ({
          id: index + 1, // temporary client id for ordering
          question: item.question,
          char_limit: item.wordLimit || 0,
        }))
      }
      const res = await api.post('/v2/ai-cover-letters', body)
      // Try multiple ways to obtain created id
      let createdId = res?.data?.id
      if (!createdId && res?.data?.data?.id) createdId = res.data.data.id
      if (!createdId && typeof res?.data === 'object' && res?.data !== null && 'ai_cover_letter_id' in res.data) {
        createdId = res.data.ai_cover_letter_id
      }
      if (!createdId && typeof res?.headers?.location === 'string') {
        const loc = res.headers.location
        const parts = loc.split('/')
        createdId = parts[parts.length - 1]
      }
      if (createdId) {
        navigate(`/ai-cover-letter/${createdId}`)
      } else {
        // Fallback: show error if id cannot be determined
        throw new Error('생성된 자소서 ID를 확인할 수 없습니다.')
      }
    } catch (err) {
      alert('생성 요청 실패: ' + (err?.response?.data?.detail || err.message))
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = () => {
    if (generatedContent) {
      const newCoverLetter = {
        id: Date.now(),
        title: `AI 자소서 ${new Date().toLocaleDateString()}`,
        date: new Date().toISOString().split('T')[0],
        jobUrl: jobUrl,
        items: generatedContent
      }
      setAiCoverLetters(prev => [newCoverLetter, ...prev])
      alert('AI 자소서가 저장되었습니다!')
      setGeneratedContent(null)
      setJobUrl('')
      setItems([{ question: '', wordLimit: 500 }])
      setActiveTab('list')
    }
  }

  const handleViewDetail = (coverLetter) => {
    navigate(`/ai-cover-letter/${coverLetter.id}`)
  }

  return (
      <div className="ai-cover-letter">
        <PageHeader>
          <div className="page-title"></div>
          <div className="header-tabs">
            <button
                className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
                onClick={() => setActiveTab('list')}
            >
              <FileText size={18} />
              AI 자소서 목록
            </button>
            <button
                className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
                onClick={() => setActiveTab('create')}
            >
              <Wand2 size={18} />
              AI 자소서 생성
            </button>
          </div>
        </PageHeader>

        {activeTab === 'list' ? (
            loading ? (
                <div className="p-8 text-center text-slate-600">불러오는 중...</div>
            ) : error ? (
                <div className="p-8 text-center text-red-600">{error}</div>
            ) : (
                <CoverLetterList
                    coverLetters={aiCoverLetters}
                    onItemClick={handleViewDetail}
                    emptyState={
                      <EmptyState
                          icon={<Bot size={48} />}
                          title="AI 자소서가 없습니다"
                          message="새로운 AI 자소서를 생성해보세요"
                      >
                        <button
                            className="create-btn"
                            onClick={() => setActiveTab('create')}
                        >
                          <Wand2 size={20} />
                          AI 자소서 생성하기
                        </button>
                      </EmptyState>
                    }
                />
            )
        ) : !generatedContent ? (
            <div className="generation-form">
              <div className="form-section">
                <h2>채용공고 정보</h2>
                <div className="form-group">
                  <label htmlFor="jobUrl">
                    <LinkIcon size={16} />
                    채용공고 URL
                  </label>
                  <input
                      type="url"
                      id="jobUrl"
                      value={jobUrl}
                      onChange={(e) => setJobUrl(e.target.value)}
                      placeholder="https://example.com/job-posting"
                      required
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>자기소개서 항목</h2>
                <div className="items-container">
                  {items.map((item, index) => (
                      <div key={index} className="item-card">
                        <div className="item-header">
                          <span className="item-number">항목 {index + 1}</span>
                          {items.length > 1 && (
                              <button
                                  type="button"
                                  className="remove-item-btn"
                                  onClick={() => removeItem(index)}
                              >
                                ×
                              </button>
                          )}
                        </div>
                        <div className="item-fields">
                          <div className="field-group">
                            <label>질문</label>
                            <input
                                type="text"
                                value={item.question}
                                onChange={(e) => updateItem(index, 'question', e.target.value)}
                                placeholder="예: 지원동기를 작성해주세요"
                                required
                            />
                          </div>
                          <div className="field-group">
                            <label>글자수 제한</label>
                            <input
                                type="number"
                                value={item.wordLimit}
                                onChange={(e) => updateItem(index, 'wordLimit', parseInt(e.target.value) || 500)}
                                min="100"
                                max="2000"
                                step="50"
                            />
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
                <button
                    type="button"
                    className="add-item-btn"
                    onClick={addItem}
                >
                  <Plus size={16} />
                  항목 추가하기
                </button>
              </div>

              <div className="form-actions">
                <button
                    className="generate-btn"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                >
                  {isGenerating ? (
                      <>
                        <div className="spinner"></div>
                        AI 자소서 생성 중...
                      </>
                  ) : (
                      <>
                        <Wand2 size={20} />
                        자소서 생성하기
                      </>
                  )}
                </button>
              </div>
            </div>
        ) : (
            <div className="generated-content">
              <div className="content-header">
                <h2>생성된 AI 자소서</h2>
                <div className="content-actions">
                  <button className="regenerate-btn" onClick={() => setGeneratedContent(null)}>
                    다시 생성
                  </button>
                  <button className="save-btn" onClick={handleSave}>
                    <FileText size={16} />
                    저장하기
                  </button>
                </div>
              </div>

              <div className="generated-items">
                {generatedContent.map((item, index) => (
                    <div key={index} className="generated-item">
                      <h3 className="question">{item.question}</h3>
                      <div className="content">
                        <p>{item.content}</p>
                        <div className="word-count">
                          글자수: {item.content.length} / {item.wordLimit}
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
        )}
      </div>
  )
}

export default AICoverLetter
