import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Pagination, Input, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Container, Row, Col, Button, Form, Modal, Card } from "react-bootstrap";
import styled from "styled-components";
import MktSidebar from "../components/MktSidebar";
import API from "../utils/axiosInstance";

// Styled Components
const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    background: #f8f9fa;
    padding: 8px 16px;
    border-radius: 8px;
  }
  .ant-tabs-tab {
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 500;
    color: #666;
    border-radius: 8px;
    width: 100px;
    text-align: center;
  }
  .ant-tabs-tab-active {
    background: white;
    border: 1px solid #ddd;
    color: #111;
    font-weight: bold;
  }
  .ant-tabs-ink-bar {
    display: none;
  }
`;

const NewsPageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #eef1f6;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 40px;
  margin-left: ${(props) => (props.isSidebarOpen ? "250px" : "70px")};
  transition: margin-left 0.3s;
`;

const StyledCard = styled(Card)`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  margin-top: auto;
  justify-content: flex-end;
`;

const SearchBar = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;

  .ant-input-affix-wrapper {
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
    padding: 8px 14px;
    background: white;
    border: 1px solid #ddd;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:focus-within {
      border-color: #007bff;
      box-shadow: 0 3px 10px rgba(0, 123, 255, 0.3);
    }
  }
`;

const Header = styled.header`
  color: Black;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 40px;
`;

const BlogCard = React.memo(({ blog, onEdit, onDelete }) => (
  <Col key={blog._id} md={6} sm={12} className="mb-4">
    <StyledCard>
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>{blog.summary}</Card.Text>
        <Card.Text>📍 {blog.location}</Card.Text>
        <Card.Text>📅 {blog.date}</Card.Text>
        <div className="d-flex gap-2">
          <Button variant="primary" onClick={() => onEdit(blog)}>
            ✏️ Chỉnh sửa
          </Button>
          <Button variant="danger" onClick={() => onDelete(blog._id)}>
            🗑️ Xóa
          </Button>
        </div>
      </Card.Body>
    </StyledCard>
  </Col>
));

const MktPostList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [keyCategory, setKeyCategory] = useState("discounts");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [blogData, setBlogData] = useState({
    title: "",
    summary: "",
    category: "discounts",
    location: "",
    date: "",
    customerName: "Makrting",
    sections: [],
  });

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await API.get(
        `/blog?page=${currentPage}&category=${keyCategory}&limit=6`
      );
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu blog", error);
    }
  }, [currentPage, keyCategory]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const resetForm = useCallback(() => {
    setBlogData({
      title: "",
      summary: "",
      category: "discounts",
      location: "",
      date: "",
      sections: [],
    });
    setEditingBlogId(null);
    setIsEditMode(false);
  }, []);

  const handleCreateOrUpdateBlog = useCallback(async () => {
    try {
      if (isEditMode) {
        await API.put(`/blog/${editingBlogId}`, blogData);
      } else {
        await API.post("/blog", blogData);
      }
      setShowModal(false);
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Lỗi khi tạo/cập nhật blog:", error);
    }
  }, [blogData, editingBlogId, fetchBlogs, isEditMode, resetForm]);

  const handleDeleteBlog = useCallback(
    async (blogId) => {
      if (!window.confirm("Bạn có chắc chắn muốn xóa blog này không?")) return;
      try {
        await API.delete(`/blog/${blogId}`);
        fetchBlogs();
      } catch (error) {
        console.error("Lỗi khi xóa blog:", error);
      }
    },
    [fetchBlogs]
  );

  const handleEditBlog = useCallback((blog) => {
    setIsEditMode(true);
    setEditingBlogId(blog._id);
    setBlogData({
      title: blog.title,
      summary: blog.summary,
      category: blog.category,
      location: blog.location,
      date: blog.date,
      sections: blog.sections || [],
    });
    setShowModal(true);
  }, []);

  const filteredBlogs = useMemo(() => {
    if (!searchQuery) return blogs;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(lowerCaseQuery) ||
        blog.location.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery, blogs]);

  return (
    <NewsPageContainer>
      <MktSidebar onToggle={() => setIsSidebarOpen((prev) => !prev)} />
      <ContentWrapper isSidebarOpen={isSidebarOpen}>
        <Header>📋 Marketing Post List</Header>
        <StyledTabs
          defaultActiveKey="discounts"
          onChange={(key) => setKeyCategory(key)}
        >
          <Tabs.TabPane tab="Khuyến mãi" key="discounts" />
          <Tabs.TabPane tab="Tin tức nội bộ" key="internalNews" />
        </StyledTabs>
        <Row>
          <Col>
            <SearchBar>
              <Input
                placeholder="Search by Title or Location..."
                prefix={<SearchOutlined style={{ color: "#888" }} />}
                allowClear
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBar>
          </Col>
          <Col>
            <Button
              onClick={() => {
                setShowModal(true);
                resetForm();
              }}
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "auto",
                width: "200px",
              }}
            >
              Thêm Blog
            </Button>
          </Col>
        </Row>
        <Row>
          {filteredBlogs.length === 0 ? (
            <Col>
              <p>Không có blog nào trong danh mục này.</p>
            </Col>
          ) : (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onEdit={handleEditBlog}
                onDelete={handleDeleteBlog}
              />
            ))
          )}
        </Row>
        <PaginationWrapper>
          <Pagination
            current={currentPage}
            total={totalPages * 6}
            pageSize={6}
            onChange={setCurrentPage}
          />
        </PaginationWrapper>
      </ContentWrapper>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Chỉnh sửa Blog" : "Thêm Blog"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Danh mục</Form.Label>
              <Form.Control
                as="select"
                value={blogData.category}
                onChange={(e) =>
                  setBlogData({ ...blogData, category: e.target.value })
                }
              >
                <option value="discounts">Khuyến mãi</option>
                <option value="internalNews">Tin tức nội bộ</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                value={blogData.title}
                onChange={(e) =>
                  setBlogData({ ...blogData, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tóm tắt</Form.Label>
              <Form.Control
                type="text"
                value={blogData.summary}
                onChange={(e) =>
                  setBlogData({ ...blogData, summary: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa điểm</Form.Label>
              <Form.Control
                type="text"
                value={blogData.location}
                onChange={(e) =>
                  setBlogData({ ...blogData, location: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày</Form.Label>
              <Form.Control
                type="date"
                value={blogData.date}
                onChange={(e) =>
                  setBlogData({ ...blogData, date: e.target.value })
                }
              />
            </Form.Group>

            <h5>Nội dung Blog</h5>
            {blogData.sections?.map((section, index) => (
              <div key={index} className="mb-3 p-3 border rounded">
                <Form.Group className="mb-2">
                  <Form.Label>Nội dung {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    value={section.text}
                    onChange={(e) => {
                      const newSections = [...blogData.sections];
                      newSections[index].text = e.target.value;
                      setBlogData({ ...blogData, sections: newSections });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Hình ảnh (URL)</Form.Label>
                  <Form.Control
                    type="text"
                    value={section.image}
                    onChange={(e) => {
                      const newSections = [...blogData.sections];
                      newSections[index].image = e.target.value;
                      setBlogData({ ...blogData, sections: newSections });
                    }}
                  />
                </Form.Group>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    const newSections = blogData.sections.filter(
                      (_, i) => i !== index
                    );
                    setBlogData({ ...blogData, sections: newSections });
                  }}
                >
                  Xóa phần này
                </Button>
              </div>
            ))}

            <Button
              variant="secondary"
              className="mb-3"
              onClick={() =>
                setBlogData({
                  ...blogData,
                  sections: [...blogData.sections, { text: "", image: "" }],
                })
              }
            >
              + Thêm phần nội dung
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleCreateOrUpdateBlog}>
            {isEditMode ? "Lưu chỉnh sửa" : "Thêm Blog"}
          </Button>
        </Modal.Footer>
      </Modal>
    </NewsPageContainer>
  );
};

export default MktPostList;