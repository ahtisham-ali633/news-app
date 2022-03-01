import React, { Component } from "react";
import { Row, Col, Typography, Dropdown, Menu, Table, Button, Image } from "antd";
import { connect } from "react-redux";
import { getNews } from "../../redux/actions/News";
import SearchInput from "../../components/News/SearchInput";
import { MoreOutlined } from "@ant-design/icons";
import NewsModal from "../../components/News/NewsModal";
import ViewNewsModal from "../../components/News/ViewNewsModal";

const { Title } = Typography;

class NewsContainer extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      isLoading: false,
      news: [],
      showModal: false,
      filteredNews: [],
      viewDetailModal: false,
      newsDetail: null,
      searchValue: ""
    }
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    });
    try {
      await this.props.getNews();
      this.setState({
        isLoading: false,
        news: this.props.news.map(x => {
          x.key = x.title;
          return x;
        }),
        filteredNews: this.props.news
      });
    } catch (e) {
      this.setState({
        isLoading: false
      })
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  onSearch = (e) => {
    const text = e.target.value;
    this.setState({
      searchValue: text
    });
    const filteredNews = this.state.news.filter((news) => {
      if (
        (news.title && news.title.toLowerCase().indexOf(text.toLowerCase()) !== -1)
        || (news.author && news.author.toLowerCase().indexOf(text.toLowerCase()) !== -1)
        || (news.description && news.description.toLowerCase().indexOf(text.toLowerCase()) !== -1)
      ) {
        return true;
      }
      return false;
    });
    this.setState({
      filteredNews: filteredNews
    });
  };

  onCancelForm = () => {
    this.formRef.current.resetFields();
    this.toggleModal();
  };

  viewDetail = (data) => {
    this.setState({ viewDetailModal: !this.state.viewDetailModal })
    this.setState({ newsDetail: data })
  }

  onCancelViewDetailModal = () => {
    this.formRef.current?.resetFields();
    this.viewDetail();
  }

  handleSubmitNews = async (data) => {
    try {
      this.setState({
        news: [...this.state.news, ...[data]],
        filteredNews: [...this.state.news, ...[data]]
      })
      this.onCancelForm();
    } catch (e) {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const columns = [
      { title: 'Title', dataIndex: "title", key: "title", align: 'center' },
      { title: 'Author', dataIndex: "author", key: 'author', align: 'center' },
      {
        title: 'Image', dataIndex: 'urlToImage', key: 'urlToImage', align: 'center',
        render: urlToImage => urlToImage ? <Image height={50} style={{ borderRadius: 15 }} src={`${urlToImage}`} preview={false} /> : ''
      },
      { title: 'Description', dataIndex: 'description', key: 'description', align: 'center' },
      {
        title: '', key: 'action', align: 'right', width: 10, render: (value, record) => <Dropdown overlay={<Menu style={{ borderRadius: "14px", width: 103, height: 45, display: 'flex', flexDirection: "column", justifyContent: "center" }}>
          <Menu.Item key="reportDownload" style={{ color: "#A3A3AE", fontSize: 12, fontWeight: "500" }} onClick={async () => { await this.viewDetail(record) }}>View Detail</Menu.Item>
        </Menu>} placement="bottomRight" trigger={['click']}>
          <MoreOutlined style={{ color: "#A3A3AE", height: "18px", width: "3px" }} />
        </Dropdown>
      },
    ]
    return (
      <Col className={'homeInner'}>
        <Row justify="center">
          <Title level={4} style={{ fontSize: 28, fontWeight: "600", marginBottom: "2rem", marginTop: "2rem" }}>News App</Title>
        </Row>
        <Row style={{ width: "90%", paddingBottom: 28 }} justify="space-between" className="addUserRow">
          <Col style={{ width: 400, marginLeft: 140 }}>
            <SearchInput value={this.state.searchValue} onChange={this.onSearch} />
          </Col>
          <Col>
            <Button
              style={{ height: 58, borderRadius: 15, backgroundColor: "#3B68FF" }}
              block
              type="primary"
              onClick={this.toggleModal}
            >Add New News</Button>
          </Col>
        </Row>

        {
          <Table size={'large'}
            style={{ border: "1px solid rgba(232, 230, 234, 0.44)", borderRadius: "18px", marginTop: 20, marginLeft: 100, marginRight: 100 }}
            className={'essAppTable'}
            responsive
            dataSource={this.state.filteredNews}
            columns={columns}
            scroll={{ x: "auto" }}
            loading={this.state.isLoading}
            pagination={{ position: ['bottomCenter'], defaultPageSize: 7 }}
            showSizeChanger
            bordered
          />
        }

        <NewsModal
          formRef={this.formRef}
          showModal={this.state.showModal}
          onSubmit={this.handleSubmitNews}
          loading={this.state.isLoading}
          onCancel={this.onCancelForm}
        />

        {
          this.state.viewDetailModal &&
          <ViewNewsModal
            formRef={this.formRef}
            onSubmit={this.handleSubmitResult}
            visible={this.state.viewDetailModal}
            onCancel={this.onCancelViewDetailModal}
            newsDetail={this.state.newsDetail || {}}
            resultToggle={this.state.resultToggle}
            handleSwab={this.handleSwab}
            loading={this.state.isLoading}
            setResultValue={this.setResultValue}
          />
        }
      </Col>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.News.isLoading,
    news: state.News.news
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNews: () =>
      dispatch(
        getNews()
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);