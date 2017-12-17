import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Header,
  Card,
  Image,
  Dropdown, 
  Divider,
  Button,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Posts extends React.Component {
  state = { category: '' }

  posts = () => {
    const { posts } = this.props;
    const { category } = this.state;
    let visible = posts;
    if (category)
      visible = posts.filter( a => a.category === category )
    return visible.map( post =>
      <Card key={post.id}>
        <Image src={post.logo} />
        <Card.Content>
          <Card.Header>
            {post.name}
          </Card.Header>
          <Card.Meta>
            <span>{post.author}</span>
          </Card.Meta>
          <Card.Description>
            {post.category}
          </Card.Description>
          <Card.Content extra>
            <Link to={`/posts/${post.id}`}>
              View Post
            </Link>
          </Card.Content>
        </Card.Content>
      </Card>
    )
  }

  categoryOptions = () => {
    return this.props.categories.map( (c,i) => { 
      return { key: i, text: c, value: c }
    })
  }

  render() {
    const { category } = this.state;
    return (
      <Container>
        <Header as="h3" textAlign="center">Posts</Header>
        <Dropdown
          placeholder="Filter by category"
          fluid
          selection
          options={this.categoryOptions()}
          onChange={ (e, data) => this.setState({ category: data.value }) }
          value={category}
        />
        { category && 
            <Button
              fluid
              basic
              onClick={ () => this.setState({ category: '' }) }
            >
              Clear Filter: {category}
            </Button>
        }
        <Divider />
        <Card.Group itemsPerRow={4}>
          { this.posts() }
        </Card.Group>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { posts } = state;
  const categories = [...new Set(posts.map( a => a.category ))]
  return { posts, categories }
}

export default connect(mapStateToProps)(Posts);