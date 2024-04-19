function sum(a, b) {
    return a + b;
}
import Home from '@/app/(afterLogin)/home/page';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />);

        const heading = screen.getByRole('heading', { level: 1 });

        expect(heading).toBeInTheDocument();
    });
});
it('renders homepage unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
});
