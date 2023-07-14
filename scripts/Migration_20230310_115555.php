<?php

use Promio\Database\Migration\UpInterface;
use Promio\Database\Migration\RollbackInterface;

class Migration_20230310_115555
    implements UpInterface, RollbackInterface {
    
    /**
     * Should execute operations which are considered a "step forward".
     *
     * This method should return true when migration is successful.
     * If false or null is returned the migration process is stopped.
     *
     * @param \Core__Interface_Sql $connection
     *
     * @return bool
     */
    public function up( \Core__Interface_Sql $connection ) 
    {
        $query = <<< QUERY
CREATE TABLE IF NOT EXISTS hoovie_extern.`dataSrc_letter` (
  `letterId` int(11) UNSIGNED NOT NULL,
  `dataSrcId` int(11) UNSIGNED NOT NULL,
  `senderId` int(11) UNSIGNED NOT NULL,
  `tsCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`letterId`, `dataSrcId`),
	INDEX `letterId` (`letterId`)
)
ENGINE=TokuDB;
QUERY;

        $connection->query($query);

        return true;
    }
    
    /**
     * Should roll back all changes made in up()
     *
     * This method should return true when rollback is successful.
     * If false or null is returned the rollback process is stopped.
     *
     * @param \Core__Interface_Sql $connection
     *     
     * @return bool
     */
    public function rollback( \Core__Interface_Sql $connection ) 
    {
        return true;
    }
}
