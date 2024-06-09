import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { removeBookId } from "../utils/localStorage";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import Auth from "../utils/auth";

const SavedBooks = () => {
  const { loading, data, error } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (error) {
    console.error("Error fetching user data:", error);
    return <h2>Error fetching user data. Please try again.</h2>;
  }

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        console.error("User not logged in.");
        return;
      }

      await removeBook({
        variables: { bookId },
        refetchQueries: [{ query: GET_ME }],
      });

      removeBookId(bookId);
      console.log("Book removed successfully");
    } catch (err) {
      console.error("Error removing book:", err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks && userData.savedBooks.length > 0
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks &&
            userData.savedBooks.length > 0 &&
            userData.savedBooks.map((book) => {
              return (
                <Col md="4" key={book.bookId}>
                  <Card border="dark">
                    {book.image ? (
                      <Card.Img
                        src={book.image}
                        alt={`The cover for ${book.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <p className="small">Authors: {book.authors}</p>
                      <Card.Text>{book.description}</Card.Text>
                      <Button
                        className="btn-block btn-danger"
                        style={{ width: "100%" }}
                        onClick={() => handleDeleteBook(book.bookId)}
                      >
                        Delete this Book!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
