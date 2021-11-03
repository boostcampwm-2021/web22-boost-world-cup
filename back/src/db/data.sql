USE `worldcup` ;

-- ------------------------------------------------------------
-- user data
-- ------------------------------------------------------------
INSERT INTO user (provider_id, nickname, gender, age) 
VALUES ('11233aewer', 'test', 1, 20);

-- ------------------------------------------------------------
-- worldcup && keyword data
-- ------------------------------------------------------------
INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup1', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc long long alaaljssjsjlsadflkjajdf길이테스트밍니ㅏ러ㅣㄴㅇ러', 0);
set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('연예인');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup2 길이테스트ㅁㄴ이런미ㅏ러ㅣㄴ어린머ㅣ런미어린마ㅓ리ㅏㅓㅁㄴㅇ리ㅏㅓ니ㅏ런ㄹ나ㅓㅣ러ㅣㅏㅁㄴㅇ리ㅓㅏ', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);
set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('동물');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup3', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);
set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('사람');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup4', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);
set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('노트북');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup5', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('컴퓨터언어');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup6', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('한국');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup7', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('김용진');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup8', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('위지원');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup9', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('정유환');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup10', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('최유진');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup11', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('아아아');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup12', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('무무무');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup13', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('김김김');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup14', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('밥밥밥');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup15', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('혼자');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup16', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('테스트');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup17', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('고양이');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup18', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('강아지');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup19', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('코뿔소');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup20', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('코끼리');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup21', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('리어카');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup22', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('자동차');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup23', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('축구');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 


INSERT INTO worldcup (title, thumbnail1, thumbnail2, total_cnt, description, is_temp) 
VALUES ('worldcup24', 'thumbnailURL1', 'thumbnailURL2', 0,'worldcup desc', 0);

set @worldcup_id = LAST_INSERT_ID();

INSERT INTO keyword (name)
VALUES ('야구');
set @keyword_id = LAST_INSERT_ID();

INSERT INTO worldcup_keyword (worldcup_id, keyword_id)
VALUE (@worldcup_id, @keyword_id);

UPDATE keyword SET cnt = cnt + 1 WHERE id = @keyword_id; 

