import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminHomeContent.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function AdminHomeContent() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        window.location.href = "/admin/login";
        return;
      }
      const response = await axios.get(`${API_URL}/home-content`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      });
      setContent(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching content:", error);
      if (error.response?.status === 401) {
        const errorMsg = error.response?.data?.expired
          ? "Token đã hết hạn (hết hạn sau 30 ngày). Vui lòng đăng nhập lại để lấy token mới."
          : "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.";
        alert(errorMsg);
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      } else {
        alert(`Lỗi: ${error.response?.data?.message || error.message}`);
      }
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        window.location.href = "/admin/login";
        return;
      }
      const response = await axios.put(`${API_URL}/home-content`, content, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Lưu thành công! Trang user sẽ cập nhật sau khi refresh.");
      console.log("Saved:", response.data);
      fetchContent();
    } catch (error) {
      console.error("Error saving content:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      } else {
        alert(`Lỗi lưu: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const updateFeature = (index, field, value) => {
    const newFeatures = [...content.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setContent({ ...content, features: newFeatures });
  };

  const addFeature = () => {
    const newFeature = {
      icon: "🎯",
      title: "",
      titleEn: "",
      description: "",
      descriptionEn: "",
      order: content.features.length + 1,
    };
    setContent({ ...content, features: [...content.features, newFeature] });
  };

  const removeFeature = (index) => {
    if (window.confirm("Bạn có chắc muốn xóa tính năng này?")) {
      const newFeatures = content.features.filter((_, i) => i !== index);
      setContent({ ...content, features: newFeatures });
    }
  };

  const updateWhyChooseUsItem = (index, field, value) => {
    const newItems = [...content.whyChooseUs.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setContent({
      ...content,
      whyChooseUs: { ...content.whyChooseUs, items: newItems },
    });
  };

  const addWhyChooseUsItem = () => {
    const newItem = {
      icon: "⭐",
      title: "",
      titleEn: "",
      description: "",
      descriptionEn: "",
      order: content.whyChooseUs.items.length + 1,
    };
    setContent({
      ...content,
      whyChooseUs: {
        ...content.whyChooseUs,
        items: [...content.whyChooseUs.items, newItem],
      },
    });
  };

  const removeWhyChooseUsItem = (index) => {
    if (window.confirm("Bạn có chắc muốn xóa mục này?")) {
      const newItems = content.whyChooseUs.items.filter((_, i) => i !== index);
      setContent({
        ...content,
        whyChooseUs: { ...content.whyChooseUs, items: newItems },
      });
    }
  };



  const updateCTA = (field, value) => {
    setContent({
      ...content,
      cta: { ...content.cta, [field]: value },
    });
  };

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>;
  }

  if (!content) {
    return <div className="admin-error">Không thể tải nội dung</div>;
  }

  return (
    <div className="admin-home-content">
      <div className="admin-header">
        <h1>Quản Lý Nội Dung Trang Chủ</h1>
        <button onClick={handleSave} disabled={saving} className="btn-save">
          {saving ? "Đang lưu..." : "💾 Lưu Thay Đổi"}
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === "features" ? "active" : ""}
          onClick={() => setActiveTab("features")}
        >
          Tính Năng
        </button>
        <button
          className={activeTab === "whyChooseUs" ? "active" : ""}
          onClick={() => setActiveTab("whyChooseUs")}
        >
          Tại Sao Chọn Chúng Tôi
        </button>
        <button
          className={activeTab === "cta" ? "active" : ""}
          onClick={() => setActiveTab("cta")}
        >
          Call To Action
        </button>
      </div>



      {activeTab === "features" && (
        <div className="admin-section">
          <h2>Tính Năng Nổi Bật</h2>

          <div className="content-item">
            <h3>Tiêu Đề Tính Năng Nổi Bật</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Tiêu đề (Tiếng Việt)</label>
                <input
                  type="text"
                  value={content.featuresTitle?.title || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      featuresTitle: {
                        ...content.featuresTitle,
                        title: e.target.value,
                      },
                    })
                  }
                  placeholder="VD: Tính Năng Nổi Bật"
                />
              </div>
              <div className="form-group">
                <label>Tiêu đề (English)</label>
                <input
                  type="text"
                  value={content.featuresTitle?.titleEn || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      featuresTitle: {
                        ...content.featuresTitle,
                        titleEn: e.target.value,
                      },
                    })
                  }
                  placeholder="VD: Outstanding Features"
                />
              </div>
            </div>
          </div>

          <div className="section-header">
            <h3>Danh Sách Tính Năng</h3>
            <button onClick={addFeature} className="btn-add">
              ➕ Thêm Tính Năng
            </button>
          </div>

          {content.features.map((feature, index) => (
            <div key={index} className="content-item">
              <div className="item-header">
                <h3>Tính năng {index + 1}</h3>
                <button
                  onClick={() => removeFeature(index)}
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
                    value={feature.icon}
                    onChange={(e) =>
                      updateFeature(index, "icon", e.target.value)
                    }
                    placeholder="🚚"
                  />
                </div>
                <div className="form-group">
                  <label>Thứ tự hiển thị</label>
                  <input
                    type="number"
                    value={feature.order}
                    onChange={(e) =>
                      updateFeature(index, "order", parseInt(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tiêu đề (Tiếng Việt)</label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) =>
                      updateFeature(index, "title", e.target.value)
                    }
                    placeholder="Miễn Phí Vận Chuyển"
                  />
                </div>
                <div className="form-group">
                  <label>Title (English)</label>
                  <input
                    type="text"
                    value={feature.titleEn}
                    onChange={(e) =>
                      updateFeature(index, "titleEn", e.target.value)
                    }
                    placeholder="Free Shipping"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mô tả (Tiếng Việt)</label>
                  <textarea
                    value={feature.description}
                    onChange={(e) =>
                      updateFeature(index, "description", e.target.value)
                    }
                    placeholder="Cho đơn hàng trên 500K"
                  />
                </div>
                <div className="form-group">
                  <label>Description (English)</label>
                  <textarea
                    value={feature.descriptionEn}
                    onChange={(e) =>
                      updateFeature(index, "descriptionEn", e.target.value)
                    }
                    placeholder="For orders over 500K"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "whyChooseUs" && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Tại Sao Chọn Chúng Tôi</h2>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tiêu đề phần (Tiếng Việt)</label>
              <input
                type="text"
                value={content.whyChooseUs.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    whyChooseUs: {
                      ...content.whyChooseUs,
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
                value={content.whyChooseUs.titleEn}
                onChange={(e) =>
                  setContent({
                    ...content,
                    whyChooseUs: {
                      ...content.whyChooseUs,
                      titleEn: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="section-header">
            <h3>Các mục</h3>
            <button onClick={addWhyChooseUsItem} className="btn-add">
              ➕ Thêm Mục
            </button>
          </div>

          {content.whyChooseUs.items.map((item, index) => (
            <div key={index} className="content-item">
              <div className="item-header">
                <h3>Mục {index + 1}</h3>
                <button
                  onClick={() => removeWhyChooseUsItem(index)}
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
                    value={item.icon}
                    onChange={(e) =>
                      updateWhyChooseUsItem(index, "icon", e.target.value)
                    }
                    placeholder="🏆"
                  />
                </div>
                <div className="form-group">
                  <label>Thứ tự hiển thị</label>
                  <input
                    type="number"
                    value={item.order}
                    onChange={(e) =>
                      updateWhyChooseUsItem(
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
                  <label>Tiêu đề (Tiếng Việt)</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      updateWhyChooseUsItem(index, "title", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Title (English)</label>
                  <input
                    type="text"
                    value={item.titleEn}
                    onChange={(e) =>
                      updateWhyChooseUsItem(index, "titleEn", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mô tả (Tiếng Việt)</label>
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      updateWhyChooseUsItem(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Description (English)</label>
                  <textarea
                    value={item.descriptionEn}
                    onChange={(e) =>
                      updateWhyChooseUsItem(
                        index,
                        "descriptionEn",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}
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

export default AdminHomeContent;
