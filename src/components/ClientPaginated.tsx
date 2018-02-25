import * as React from 'react';
import { Pagination } from 'semantic-ui-react';
import { PaginationProps } from 'semantic-ui-react/dist/commonjs/addons/Pagination/Pagination';

interface Props<TItem> {
  items: TItem[];
  pageSize: number;

  children(items: TItem[]): JSX.Element;
}

export default class ClientPaginated<T> extends React.Component<Props<T>, { activePage: number }> {
  state = {
    activePage: 1
  };

  componentWillReceiveProps({ items }: Props<T>) {
    if (items !== this.props.items) {
      this.setState({ activePage: 1 });
    }
  }

  handlePageChange = (event: React.MouseEvent<HTMLAnchorElement>, { activePage }: PaginationProps) => {
    if (typeof activePage !== 'number') {
      return;
    }

    this.setState({ activePage });
  };

  render() {
    const { items, pageSize, children } = this.props;
    const { activePage } = this.state;

    const numPages: number = Math.max(1, Math.ceil(items.length / pageSize));

    const start = (activePage - 1) * pageSize;
    const pageItems = items.slice(start, start + pageSize);

    return (
      <div>
        {children(pageItems)}

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Pagination
            nextItem={null}
            prevItem={null}
            onPageChange={this.handlePageChange}
            totalPages={numPages}
            activePage={activePage}
          />
        </div>
      </div>
    );
  }
}