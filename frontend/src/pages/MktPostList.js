import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Card,
} from "react-bootstrap";
import PopularNews from "../components/PopularNews";
import MktSidebar from "../components/MktSidebar";
import API from "../utils/axiosInstance";
import styled from "styled-components";
import { Tabs } from "antd";

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    background: #f8f9fa;
    padding: 8px 16px;
    border-radius: 8px;
  }
  .ant-tabs-tab {
    text-decoration: none;
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 500;
    color: #666;
    transition: all 0.3s ease-in-out;
    border-radius: 8px;
    width: 100px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ant-tabs-tab-active {
    background: white !important;
    border: 1px solid #ddd !important;
    color: rgb(17, 20, 21) !important;
    font-weight: bold;
    padding: 6px 17px;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: rgb(17, 20, 21) !important;
  }
  .ant-tabs-tab:hover {
    color: rgb(22, 27, 28);
    background: rgb(255, 255, 255);
  }
  .ant-tabs-ink-bar {
    display: none !important;
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

const MktPostList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [keyCategory, setKeyCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [blogData, setBlogData] = useState({
    title: "",
    summary: "",
    category: "discounts",
    sections: [],
    location: "",
    date: "",
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await API.get(
          `/blog?page=${currentPage}&category=${keyCategory}`
        );
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu blog", error);
      }
    };
    fetchBlogs();
  }, [currentPage, keyCategory]);

  const handleCreateOrUpdateBlog = async () => {
    try {
      if (isEditMode) {
        await API.put(`/blog/${editingBlogId}`, blogData);
      } else {
        await API.post("/blog", blogData);
      }
      setShowModal(false);
      setCurrentPage(1);
    } catch (error) {
      console.error("Lỗi khi tạo/cập nhật blog", error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await API.delete(`/blog/${blogId}`);
      setCurrentPage(1);
    } catch (error) {
      console.error("Lỗi khi xóa blog", error);
    }
  };

  const handleEditBlog = (blog) => {
    setIsEditMode(true);
    setEditingBlogId(blog._id);
    setBlogData({
      title: blog.title,
      summary: blog.summary,
      category: blog.category,
      sections: blog.sections || [],
      location: blog.location,
      date: blog.date,
    });
    setShowModal(true);
  };

  return (
    <NewsPageContainer>
      <MktSidebar onToggle={() => setIsSidebarOpen((prev) => !prev)} />
      <ContentWrapper isSidebarOpen={isSidebarOpen}>
        <StyledTabs
          defaultActiveKey="discounts"
          onChange={(key) => setKeyCategory(key)}
        >
          <Tabs.TabPane tab="Khuyến mãi" key="discounts" />
          <Tabs.TabPane tab="Tin tức nội bộ" key="internalNews" />
        </StyledTabs>
        <Button
          onClick={() => {
            setShowModal(true);
            setIsEditMode(false);
          }}
          style={{ marginBottom: "20px" }}
        >
          Thêm Blog
        </Button>
        <Row>
          <Col md={8} style={{ padding: "20px" }}>
            {blogs.map((blog) => (
              <Card key={blog._id} className="mb-3">
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.summary}</Card.Text>
                  <Card.Text>Địa điểm: {blog.location}</Card.Text>
                  <Card.Text>Ngày: {blog.date}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleEditBlog(blog)}
                  >
                    Chỉnh sửa
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBlog(blog._id)}
                  >
                    Xóa
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
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
          </Form>
        </Modal.Body>
      </Modal>
    </NewsPageContainer>
  );
};

export default MktPostList;
