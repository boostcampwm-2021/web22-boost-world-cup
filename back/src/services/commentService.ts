import { getRepository } from 'typeorm';
import { Comment } from '../entity/Comment';
import { User } from '../entity/User';
import { Worldcup } from '../entity/Worldcup';

export const findByWorldcupId = async (worldcupId: string) => {
  return await getRepository(Comment)
    .createQueryBuilder('comment')
    .select([
      'comment.id AS id',
      'comment.message AS message',
      'comment.created_at AS createdAt',
      'user.nickname AS nickname',
    ])
    .innerJoin('comment.user', 'user')
    .where('comment.worldcup_id= :id', { id: worldcupId })
    .execute();
};

export const save = async (user: User, worldcup: Worldcup, message: string) => {
  const commentRepository = getRepository(Comment);
  const comment = new Comment();
  comment.user = user;
  comment.worldcup = worldcup;
  comment.message = message;
  return await commentRepository.save(comment);
};
