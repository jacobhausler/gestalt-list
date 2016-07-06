INSERT INTO users (id, email, password_hash, first_name, last_name)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'test1@test.com', 'Sigmund', 'Freud'),
  ('00000000-0000-0000-0000-000000000002', 'test2@test.com', 'Ivan', 'Pavlov'),
  ('00000000-0000-0000-0000-000000000003', 'test3@test.com', 'Carl', 'Jung');

INSERT INTO user_followed_users (user_id, followed_user_id)
VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001');
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002');

INSERT INTO posts (id, title, text, created_at, authored_by_user_id)
VALUES
  ('00000000-0000-0000-0000-000000000004', 'Jerks..', 'Civilization began the first time an angry person cast a word instead of a rock.', now() + interval '1 hour', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000005', 'Someday I will figure out what updog is', 'Dont become a mere recorder of facts, but try to penetrate the mystery of their origin.', now() + interval '2 hours', '00000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000006', 'Check it out - I can dim these with my phone', 'As far as we can discern, the sole purpose of human existence is to kindle a light in the darkness of mere being.', now() + interval '3 hours', '00000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000007', 'Shower thoughts', 'The conscious mind may be compared to a fountain playing in the sun and falling back into the great subterranean pool of subconscious from which it rises.', now() + interval '4 hours', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000008', 'This soylent is definitely better with two scoops of nesquik', 'Man has still another powerful resource: natural science with its strictly objective methods.', now() + interval '5 hours', '00000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000009', 'I got heated', 'A man who has not passed through the inferno of his passions has never overcome them.', now() + interval '6 hours', '00000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000010', 'This is why i dont have plants', 'Most people do not really want freedom, because freedom involves responsibility, and most people are frightened of responsibility.', now() + interval '7 hours', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000011', 'Im hungry', 'It is not accidental that all phenomena of human life are dominated by the search for daily bread - the oldest link connecting all living things, man included, with the surrounding nature.', now() + interval '8 hours', '00000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000012', 'Have you seen "the room"?', 'The pendulum of the mind alternates between sense and nonsense, not between right and wrong.', now() + interval '9 hours', '00000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000013', 'I had this weird dream', 'The psychical, whatever its nature may be, is itself unconscious.', now() + interval '10 hours', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000014', 'So I was like "Lets check wikipedia"', 'Perfect as the wing of a bird may be, it will never enable the bird to fly if unsupported by the air. Facts are the air of science. Without them a man of science can never rise.', now() + interval '11 hours', '00000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000015', 'I just painted my nails black', 'Knowing your own darkness is the best method for dealing with the darknesses of other people.', now() + interval '12 hours', '00000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000016', 'Look, this one can play piano', 'Time spent with cats is never wasted.', now() + interval '13 hours', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000017', 'Who wants to order sushi?', 'Appetite, craving for food, is a constant and powerful stimulator of the gastric glands.', now() + interval '14 hours', '00000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000018', 'Time to get deep', 'Who looks outside, dreams; who looks inside, awakes.', now() + interval '15 hours', '00000000-0000-0000-0000-000000000003'),
  ('00000000-0000-0000-0000-000000000019', 'I meant to DM but I accidentally tweeted it', 'The word happiness would lose its meaning if it were not balanced by sadness.', now() + interval '16 hours', '00000000-0000-0000-0000-000000000003');
