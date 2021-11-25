import { getRepository } from 'typeorm';
import { Comment } from '../entity/Comment';
import { User } from '../entity/User';
import { Worldcup } from '../entity/Worldcup';

export const findByWorldcupId = async (worldcupId: string, offset: string, limit: string) => {
  return await getRepository(Comment)
    .createQueryBuilder('comment')
    .select([
      'comment.id AS commentId',
      'user.id AS userId',
      'comment.message AS message',
      'comment.created_at AS createdAt',
      'user.nickname AS nickname',
    ])
    .innerJoin('comment.user', 'user')
    .where('comment.worldcup_id= :id', { id: worldcupId })
    .orderBy('comment.created_at', 'DESC')
    .offset(Number(offset))
    .limit(Number(limit))
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

export const deleteById = async (commentId: string) => {
  try {
    const commentRepository = getRepository(Comment);
    const commentToRemove = await commentRepository.findOne(commentId);
    await commentRepository.remove(commentToRemove);
    return { result: 'success' };
  } catch (err) {
    throw new Error(err);
  }
};

export const getCountByWorldcupId = async (worldcup: Worldcup) => {
  try {
    const commentRepository = getRepository(Comment);
    const commentCount = await commentRepository.count({ worldcup });
    return commentCount;
  } catch (err) {
    throw new Error(err);
  }
};
