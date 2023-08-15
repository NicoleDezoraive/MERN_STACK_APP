import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe("Header", () => {

    describe("Function get by 1", ()=> {
        test('should render same text passed into title prop', async () => {
          render(<Header title="My header" />);
          const headingElement = screen.getByText(/my header/i);
          expect(headingElement).toBeInTheDocument();
        });
    })

    describe("Function get by 2", ()=> {
        test('should render same text passed into title prop', async () => {
            render(<Header title="My header" />);
            const headingElement = screen.getByRole("heading", {name: "My header"});
            expect(headingElement).toBeInTheDocument();
        });
    })

    describe("Function get by 3", ()=> {
        test('should render same text passed into title prop', async () => {
            render(<Header title="My header" />);
            const headingElement = screen.getByTitle("Header");
            expect(headingElement).toBeInTheDocument();
        });
    })

    describe("Function get by 4", ()=> {
        test('should render same text passed into title prop', async () => {
            render(<Header title="My header" />);
            const headingElement = screen.getByTestId("header-1");
            expect(headingElement).toBeInTheDocument();
        });
    })

    describe("Function get by 5", ()=> {
        test('should render same text passed into title prop', async () => {
            render(<Header title="My header" />);
            const headingElements = screen.getAllByRole("heading", {name: "My header"});
            expect(headingElements.length).toBe(1);
        });
    })

    describe("Function find by 1", ()=> {
        test('should render same text passed into title prop', async () => {
            render(<Header title="My header" />);
            const headingElement = await screen.findByText(/my header/i);
            expect(headingElement).toBeInTheDocument();
        });     
    })

    describe("Function query by 1", ()=> {
        test('should render same text passed into title prop', async () => {
            render(<Header title="My header" />);
            const headingElement = screen.queryByText(/dog /i);
            expect(headingElement).not.toBeInTheDocument();
        }); 
    })

})







