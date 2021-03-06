import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import * as newsActions from '../../actions/newsActions';

class NewsItemPage extends React.Component {
		componentDidMount() {
				if(this.props.news.length === 0) this.props.fetchNews();
		}

		render() {
			const {newsItem} = this.props;
			return (
					<Card>
						<CardTitle
								title={newsItem.title}
						/>
						<CardText>
							{newsItem.description}
						</CardText>
					</Card>
			)
		}
}

NewsItemPage.propTypes = {
		news: PropTypes.array.isRequired,
		newsItem: PropTypes.object
};

function getNewsById(news, id){
		const newsItem = news.filter(item => item.url.split("/").pop(-1) === id );
		if(newsItem) return newsItem[0];
		return null;
}

function mapStateToProps(state, ownProps) {
		let newsId = ownProps.params.title;
		let newsItem = {id: newsId, title: '', description: ''};
		if(newsId && state.news.length > 0) newsItem = getNewsById(state.news, newsId);

		return {
				news: state.news,
				newsItem: newsItem
		}
}

const mapDispatchToProps = (dispatch) => ({
		fetchNews: (params) => dispatch(newsActions.fetchNews(params))
});

export default connect(mapStateToProps,mapDispatchToProps)(NewsItemPage);
