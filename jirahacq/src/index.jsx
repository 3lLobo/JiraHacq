import api, { route } from '@forge/api';
import ForgeUI, { render, Fragment, Text, IssuePanel, IssueAction, ModalDialog, useProductContext, useState } from "@forge/ui";

const App = () => {
  const context = useProductContext();
  const comments = useState(async () => await fetchCommentsForIssue(context.platformContext.issueKey));
  const [isOpen, setOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalDialog appearance='danger' width='x-large' header="Hello" onClose={() => setOpen(false)}>
      <Fragment>
        <Text>Hello world!</Text>
        <Text>
          Number of commies: {comments.length}
        </Text>
        <Text>
          Authors: {comments.map(c => c.author).join(' | ')}
        </Text>
      </Fragment>
    </ModalDialog>
  );
};

export const run = render(
  <IssueAction>
    <App />
  </IssueAction>
);


const fetchCommentsForIssue = async (issueIdOrKey) => {
  const res = await api.asUser().requestJira(route`/rest/api/3/issue/${issueIdOrKey}/comment`);
  const data = await res.json();
  return data.comments;
}