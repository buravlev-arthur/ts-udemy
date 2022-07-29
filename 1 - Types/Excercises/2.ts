enum Status {
  published = 'published',
  draft = 'draft',
  deleted = 'deleted',
}

const request = { topicId: 5, status: Status.draft };
const request2 = { topicId: 6 };

const getFaqs = async (req: {
  topicId: number,
  status?: Status,
}): Promise<{
  question: string,
  answer: string,
  tags: string[],
  likes: number,
  status?: Status,
}[]> => {
  const res = await fetch('/faqs', {
    method: 'POST',
    body: JSON.stringify(req),
  });
  const data = await res.json();
  return data;
};

getFaqs(request);
getFaqs(request2);