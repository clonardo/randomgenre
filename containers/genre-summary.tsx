import { useGenres } from '../context/genre-context';
import { useAvailableGenres } from '../hooks/use-available-genres';
import { Row, Col, Divider, Typography } from 'antd';
import { GenreList } from '../components/genre-list';

const style = {};

/**
 * Get full genre state from Firebase
 */
export const GenreSummary = () => {
  const availableGenres = useAvailableGenres();
  const {
    genres: { completed, skipped, wip }
  } = useGenres();

  return (
    <div style={{ padding: '15px' }}>
      <Row style={{ justifyContent: 'center' }}>
        <Typography.Title level={3}>In Progress: {wip}</Typography.Title>
      </Row>
      <Divider orientation="left">Other Genres</Divider>
      <Row>
        <Col className="gutter-row" span={8}>
          <div style={style}>
            <GenreList displayTitle={'Available'} items={availableGenres} />
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div style={style}>
            <GenreList displayTitle={'Completed'} items={completed} />
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div style={style}>
            <GenreList displayTitle={'Skipped'} items={skipped} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
