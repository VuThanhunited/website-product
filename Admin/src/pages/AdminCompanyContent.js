import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminCompanyContent.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function AdminCompanyContent() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/company-content`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContent(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching content:", error);
      alert("Lỗi khi tải nội dung");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}/company-content`, content, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Lưu thành công!");
      fetchContent();
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Lỗi khi lưu nội dung");
    } finally {
      setSaving(false);
    }
  };

  const updateHero = (field, value) => {
    setContent({ ...content, hero: { ...content.hero, [field]: value } });
  };

  const updateIntro = (field, value) => {
    setContent({ ...content, intro: { ...content.intro, [field]: value } });
  };

  const updateGallery = (field, value) => {
    setContent({ ...content, gallery: { ...content.gallery, [field]: value } });
  };

  const updateValue = (index, field, value) => {
    const newItems = [...content.values.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setContent({
      ...content,
      values: { ...content.values, items: newItems },
    });
  };

  const addValue = () => {
    const newValue = {
      icon: "🎯",
      title: "",
      titleEn: "",
      description: "",
      descriptionEn: "",
      order: content.values.items.length + 1,
    };
    setContent({
      ...content,
      values: { ...content.values, items: [...content.values.items, newValue] },
    });
  };

  const removeValue = (index) => {
    if (window.confirm("Bạn có chắc muốn xóa giá trị này?")) {
      const newItems = content.values.items.filter((_, i) => i !== index);
      setContent({
        ...content,
        values: { ...content.values, items: newItems },
      });
    }
  };

  const updateAchievement = (index, field, value) => {
    const newItems = [...content.achievements.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setContent({
      ...content,
      achievements: { ...content.achievements, items: newItems },
    });
  };

  const addAchievement = () => {
    const newAchievement = {
      number: "0",
      label: "",
      labelEn: "",
      order: content.achievements.items.length + 1,
    };
    setContent({
      ...content,
      achievements: {
        ...content.achievements,
        items: [...content.achievements.items, newAchievement],
      },
    });
  };

  const removeAchievement = (index) => {
    if (window.confirm("Bạn có chắc muốn xóa thành tựu này?")) {
      const newItems = content.achievements.items.filter((_, i) => i !== index);
      setContent({
        ...content,
        achievements: { ...content.achievements, items: newItems },
      });
    }
  };

  const updateCTA = (field, value) => {
    setContent({ ...content, cta: { ...content.cta, [field]: value } });
  };

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>;
  }

  if (!content) {
    return <div className="admin-error">Không thể tải nội dung</div>;
  }

  return (
    <div className="admin-company-content">
      <div className="admin-header">
        <h1>Quản Lý Nội Dung Trang Công Ty</h1>
        <button onClick={handleSave} disabled={saving} className="btn-save">
          {saving ? "Đang lưu..." : "💾 Lưu Thay Đổi"}
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === "hero" ? "active" : ""}
          onClick={() => setActiveTab("hero")}
        >
          Hero Section
        </button>
        <button
          className={activeTab === "intro" ? "active" : ""}
          onClick={() => setActiveTab("intro")}
        >
          Giới Thiệu
        </button>
        <button
          className={activeTab === "values" ? "active" : ""}
          onClick={() => setActiveTab("values")}
        >
          Giá Trị Cốt Lõi
        </button>
        <button
          className={activeTab === "achievements" ? "active" : ""}
          onClick={() => setActiveTab("achievements")}
        >
          Thành Tựu
        </button>
        <button
          className={activeTab === "gallery" ? "active" : ""}
          onClick={() => setActiveTab("gallery")}
        >
          Thư Viện
        </button>
        <button
          className={activeTab === "cta" ? "active" : ""}
          onClick={() => setActiveTab("cta")}
        >
          Call To Action
        </button>
      </div>

      {activeTab === "hero" && (
        <div className="admin-section">
          <h2>Hero Section</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề (Tiếng Việt)</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => updateHero("title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Title (English)</label>
              <input
                type="text"
                value={content.hero.titleEn}
                onChange={(e) => updateHero("titleEn", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phụ đề (Tiếng Việt)</label>
              <input
                type="text"
                value={content.hero.subtitle}
                onChange={(e) => updateHero("subtitle", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subtitle (English)</label>
              <input
                type="text"
                value={content.hero.subtitleEn}
                onChange={(e) => updateHero("subtitleEn", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "intro" && (
        <div className="admin-section">
          <h2>Giới Thiệu Công Ty</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề (Tiếng Việt)</label>
              <input
                type="text"
                value={content.intro.title}
                onChange={(e) => updateIntro("title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Title (English)</label>
              <input
                type="text"
                value={content.intro.titleEn}
                onChange={(e) => updateIntro("titleEn", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Đoạn 1 (Tiếng Việt)</label>
              <textarea
                value={content.intro.paragraph1}
                onChange={(e) => updateIntro("paragraph1", e.target.value)}
                rows="5"
              />
            </div>
            <div className="form-group">
              <label>Paragraph 1 (English)</label>
              <textarea
                value={content.intro.paragraph1En}
                onChange={(e) => updateIntro("paragraph1En", e.target.value)}
                rows="5"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Đoạn 2 (Tiếng Việt)</label>
              <textarea
                value={content.intro.paragraph2}
                onChange={(e) => updateIntro("paragraph2", e.target.value)}
                rows="5"
              />
            </div>
            <div className="form-group">
              <label>Paragraph 2 (English)</label>
              <textarea
                value={content.intro.paragraph2En}
                onChange={(e) => updateIntro("paragraph2En", e.target.value)}
                rows="5"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "values" && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Giá Trị Cốt Lõi</h2>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề phần (Tiếng Việt)</label>
              <input
                type="text"
                value={content.values.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    values: { ...content.values, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Section Title (English)</label>
              <input
                type="text"
                value={content.values.titleEn}
                onChange={(e) =>
                  setContent({
                    ...content,
                    values: { ...content.values, titleEn: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="section-header">
            <h3>Các giá trị</h3>
            <button onClick={addValue} className="btn-add">
              ➕ Thêm Giá Trị
            </button>
          </div>

          {content.values.items.map((value, index) => (
            <div key={index} className="content-item">
              <div className="item-header">
                <h3>Giá trị {index + 1}</h3>
                <button
                  onClick={() => removeValue(index)}
                  className="btn-remove"
                >
                  🗑️
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Icon (Emoji)</label>
                  <input
                    type="text"
                    value={value.icon}
                    onChange={(e) => updateValue(index, "icon", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Thứ tự</label>
                  <input
                    type="number"
                    value={value.order}
                    onChange={(e) =>
                      updateValue(index, "order", parseInt(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tiêu đề (Tiếng Việt)</label>
                  <input
                    type="text"
                    value={value.title}
                    onChange={(e) =>
                      updateValue(index, "title", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Title (English)</label>
                  <input
                    type="text"
                    value={value.titleEn}
                    onChange={(e) =>
                      updateValue(index, "titleEn", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mô tả (Tiếng Việt)</label>
                  <textarea
                    value={value.description}
                    onChange={(e) =>
                      updateValue(index, "description", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Description (English)</label>
                  <textarea
                    value={value.descriptionEn}
                    onChange={(e) =>
                      updateValue(index, "descriptionEn", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "achievements" && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Thành Tựu</h2>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề phần (Tiếng Việt)</label>
              <input
                type="text"
                value={content.achievements.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    achievements: {
                      ...content.achievements,
                      title: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Section Title (English)</label>
              <input
                type="text"
                value={content.achievements.titleEn}
                onChange={(e) =>
                  setContent({
                    ...content,
                    achievements: {
                      ...content.achievements,
                      titleEn: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="section-header">
            <h3>Các thành tựu</h3>
            <button onClick={addAchievement} className="btn-add">
              ➕ Thêm Thành Tựu
            </button>
          </div>

          {content.achievements.items.map((achievement, index) => (
            <div key={index} className="content-item">
              <div className="item-header">
                <h3>Thành tựu {index + 1}</h3>
                <button
                  onClick={() => removeAchievement(index)}
                  className="btn-remove"
                >
                  🗑️
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số (VD: 15+, 1000+, 99%)</label>
                  <input
                    type="text"
                    value={achievement.number}
                    onChange={(e) =>
                      updateAchievement(index, "number", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Thứ tự</label>
                  <input
                    type="number"
                    value={achievement.order}
                    onChange={(e) =>
                      updateAchievement(
                        index,
                        "order",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nhãn (Tiếng Việt)</label>
                  <input
                    type="text"
                    value={achievement.label}
                    onChange={(e) =>
                      updateAchievement(index, "label", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Label (English)</label>
                  <input
                    type="text"
                    value={achievement.labelEn}
                    onChange={(e) =>
                      updateAchievement(index, "labelEn", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "gallery" && (
        <div className="admin-section">
          <h2>Thư Viện Ảnh</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề (Tiếng Việt)</label>
              <input
                type="text"
                value={content.gallery.title}
                onChange={(e) => updateGallery("title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Title (English)</label>
              <input
                type="text"
                value={content.gallery.titleEn}
                onChange={(e) => updateGallery("titleEn", e.target.value)}
              />
            </div>
          </div>

          <p className="info-text">
            Ảnh thư viện được quản lý ở phần Media Slides
          </p>
        </div>
      )}

      {activeTab === "cta" && (
        <div className="admin-section">
          <h2>Call To Action</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề (Tiếng Việt)</label>
              <input
                type="text"
                value={content.cta.title}
                onChange={(e) => updateCTA("title", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Title (English)</label>
              <input
                type="text"
                value={content.cta.titleEn}
                onChange={(e) => updateCTA("titleEn", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mô tả (Tiếng Việt)</label>
              <textarea
                value={content.cta.description}
                onChange={(e) => updateCTA("description", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description (English)</label>
              <textarea
                value={content.cta.descriptionEn}
                onChange={(e) => updateCTA("descriptionEn", e.target.value)}
              />
            </div>
          </div>

          <h3>Nút Chính</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Text (Tiếng Việt)</label>
              <input
                type="text"
                value={content.cta.primaryButtonText}
                onChange={(e) => updateCTA("primaryButtonText", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Text (English)</label>
              <input
                type="text"
                value={content.cta.primaryButtonTextEn}
                onChange={(e) =>
                  updateCTA("primaryButtonTextEn", e.target.value)
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label>Link</label>
            <input
              type="text"
              value={content.cta.primaryButtonLink}
              onChange={(e) => updateCTA("primaryButtonLink", e.target.value)}
            />
          </div>

          <h3>Nút Phụ</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Text (Tiếng Việt)</label>
              <input
                type="text"
                value={content.cta.secondaryButtonText}
                onChange={(e) =>
                  updateCTA("secondaryButtonText", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Text (English)</label>
              <input
                type="text"
                value={content.cta.secondaryButtonTextEn}
                onChange={(e) =>
                  updateCTA("secondaryButtonTextEn", e.target.value)
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label>Link</label>
            <input
              type="text"
              value={content.cta.secondaryButtonLink}
              onChange={(e) => updateCTA("secondaryButtonLink", e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCompanyContent;
