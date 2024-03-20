import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1710922447051 implements MigrationInterface {
    name = 'Migration1710922447051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_book" DROP CONSTRAINT "FK_fb2bb0d18952e853610165e6b24"`);
        await queryRunner.query(`ALTER TABLE "user_book" DROP CONSTRAINT "FK_4b07791db84699c1f0b5593979d"`);
        await queryRunner.query(`ALTER TABLE "book_genre" DROP CONSTRAINT "FK_fa09ea26c5837f4f4160ae55715"`);
        await queryRunner.query(`ALTER TABLE "book_genre" DROP CONSTRAINT "FK_df2409dcd1dade9038a7d79e653"`);
        await queryRunner.query(`ALTER TABLE "book_author" DROP CONSTRAINT "FK_01af769e5879705bc5035b731c7"`);
        await queryRunner.query(`ALTER TABLE "book_author" DROP CONSTRAINT "FK_51dabed37e04e81c0b7703d7ad4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa09ea26c5837f4f4160ae5571"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df2409dcd1dade9038a7d79e65"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb2bb0d18952e853610165e6b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4b07791db84699c1f0b5593979"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01af769e5879705bc5035b731c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51dabed37e04e81c0b7703d7ad"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8eadab3ff3d3a6a4dbc2932508" ON "authors" ("full_name") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3cd818eaf734a9d8814843f119" ON "books" ("title") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b37dce0f06a1eeb5195e504517" ON "genres" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb2bb0d18952e853610165e6b2" ON "user_book" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4b07791db84699c1f0b5593979" ON "user_book" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fa09ea26c5837f4f4160ae5571" ON "book_genre" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_df2409dcd1dade9038a7d79e65" ON "book_genre" ("genre_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_01af769e5879705bc5035b731c" ON "book_author" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_51dabed37e04e81c0b7703d7ad" ON "book_author" ("author_id") `);
        await queryRunner.query(`ALTER TABLE "book_genre" ADD CONSTRAINT "FK_fa09ea26c5837f4f4160ae55715" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_genre" ADD CONSTRAINT "FK_df2409dcd1dade9038a7d79e653" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_book" ADD CONSTRAINT "FK_fb2bb0d18952e853610165e6b24" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_book" ADD CONSTRAINT "FK_4b07791db84699c1f0b5593979d" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_author" ADD CONSTRAINT "FK_01af769e5879705bc5035b731c7" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_author" ADD CONSTRAINT "FK_51dabed37e04e81c0b7703d7ad4" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_author" DROP CONSTRAINT "FK_51dabed37e04e81c0b7703d7ad4"`);
        await queryRunner.query(`ALTER TABLE "book_author" DROP CONSTRAINT "FK_01af769e5879705bc5035b731c7"`);
        await queryRunner.query(`ALTER TABLE "user_book" DROP CONSTRAINT "FK_4b07791db84699c1f0b5593979d"`);
        await queryRunner.query(`ALTER TABLE "user_book" DROP CONSTRAINT "FK_fb2bb0d18952e853610165e6b24"`);
        await queryRunner.query(`ALTER TABLE "book_genre" DROP CONSTRAINT "FK_df2409dcd1dade9038a7d79e653"`);
        await queryRunner.query(`ALTER TABLE "book_genre" DROP CONSTRAINT "FK_fa09ea26c5837f4f4160ae55715"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51dabed37e04e81c0b7703d7ad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01af769e5879705bc5035b731c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df2409dcd1dade9038a7d79e65"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa09ea26c5837f4f4160ae5571"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4b07791db84699c1f0b5593979"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb2bb0d18952e853610165e6b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b37dce0f06a1eeb5195e504517"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3cd818eaf734a9d8814843f119"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8eadab3ff3d3a6a4dbc2932508"`);
        await queryRunner.query(`CREATE INDEX "IDX_51dabed37e04e81c0b7703d7ad" ON "book_author" ("author_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_01af769e5879705bc5035b731c" ON "book_author" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4b07791db84699c1f0b5593979" ON "user_book" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb2bb0d18952e853610165e6b2" ON "user_book" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_df2409dcd1dade9038a7d79e65" ON "book_genre" ("genre_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fa09ea26c5837f4f4160ae5571" ON "book_genre" ("book_id") `);
        await queryRunner.query(`ALTER TABLE "book_author" ADD CONSTRAINT "FK_51dabed37e04e81c0b7703d7ad4" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_author" ADD CONSTRAINT "FK_01af769e5879705bc5035b731c7" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_genre" ADD CONSTRAINT "FK_df2409dcd1dade9038a7d79e653" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_genre" ADD CONSTRAINT "FK_fa09ea26c5837f4f4160ae55715" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_book" ADD CONSTRAINT "FK_4b07791db84699c1f0b5593979d" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_book" ADD CONSTRAINT "FK_fb2bb0d18952e853610165e6b24" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
