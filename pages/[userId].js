function UserIdPage(props) {
  return <h1>{props.userId}</h1>;
}

export default UserIdPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.userId;
  return {
    props: {
      userId: `userId-${userId}`,
    },
  };
}
