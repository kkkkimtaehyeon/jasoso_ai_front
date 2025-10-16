import React, {useState, useEffect} from 'react';
import {Save, Trash2} from 'lucide-react';
import CoverLetterItemList from './CoverLetterItemList.jsx';

const CoverLetterEditor = ({
                               title,
                               items,
                               onItemsChange,
                               onAddItem,
                               onRemoveItem,
                               currentItemIndex,
                               onSelectItem,
                               onSave,
                               saving,
                               isEditing,
                               setIsEditing,
                               onDeleteAll // 전체 삭제 핸들러(상위에서 구현)
                           }) => {
    const [editingContent, setEditingContent] = useState('');

    // 항목 전환 시에도 수정모드 유지, 내용만 바꾼다
    useEffect(() => {
        setEditingContent(items[currentItemIndex]?.content || '');
    }, [currentItemIndex, items]);

    // 저장 시 실제 저장(onSave) 호출
    const handleSave = () => {
        const newItems = [...items];
        newItems[currentItemIndex].content = editingContent;
        onItemsChange(newItems);
        if (onSave) onSave();
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditingContent(items[currentItemIndex]?.content || '');
        setIsEditing(false);
    };

    // 항목 삭제: confirm 후 삭제
    const handleRemoveItem = (index) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            onRemoveItem(index);
        }
    };

    // 전체 삭제: confirm 후 onDeleteAll 호출
    const handleDeleteAll = () => {
        if (window.confirm('정말 자소서 전체를 삭제하시겠습니까?')) {
            onDeleteAll && onDeleteAll();
        }
    };

    const currentItem = items[currentItemIndex];

    return (
        <>
            <div className="flex-1 flex justify-end gap-2 items-center mb-1">
                {/* 수정/저장 버튼 */}
                <button
                    type="button"
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    disabled={saving}
                >
                    <Save className="inline mr-2" size={16}/>
                    {isEditing ? '저장' : '수정'}
                </button>
                {/* 전체 삭제 버튼: 수정모드에서만 */}
                {isEditing && (
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors flex items-center"
                        onClick={handleDeleteAll}
                        type="button"
                    >
                        <Trash2 className="mr-1" size={18}/>
                        전체 삭제
                    </button>
                )}
            </div>
            <section className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-sm">

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">{title}</h2>
                    <CoverLetterItemList
                        items={items}
                        currentItemIndex={currentItemIndex}
                        onSelectItem={onSelectItem}
                        onAddItem={isEditing ? onAddItem : undefined}
                        onRemoveItem={isEditing ? handleRemoveItem : undefined}
                    />
                </div>

                <div className="space-y-6 mt-6">
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 py-3 border-b border-slate-200">
                            {currentItem?.question}
                        </h3>
                    </div>
                    <div>
                        {isEditing ? (
                            <textarea
                                className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
                                placeholder="Enter your content here..."
                                rows={12}
                                value={editingContent}
                                onChange={e => setEditingContent(e.target.value)}
                            />
                        ) : (
                            <p className="whitespace-pre-line text-slate-800 leading-relaxed text-base min-h-[288px] bg-slate-50 p-4 rounded-md">
                                {currentItem?.content || ''}
                            </p>
                        )}
                        <div className="flex justify-between items-center mt-2">
                        
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                                >
                                    수정 취소
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default CoverLetterEditor;