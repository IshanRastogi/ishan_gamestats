<?php

/**
 * Changes all database tables charset to the specified charset
 * recommended to use utf8,utf8_general_ci 
 * for testing purposes you might use latin1, latin1_general_ci
 * 
 * @param string $charset charset name to change to 
 * @param string $show_results outputs results for every table
 * @return void
 */

function db_change_charset_for_tables($charset = 'utf8', $collate='utf8_general_ci', $data = true){ 
    
    if(!trim($charset) || !trim($collate)){
        echo 'No charset selected';
        return;
    }
    
    $CI = &get_instance();
    $query_show_tables = 'SELECT table_name FROM information_schema.tables WHERE table_schema = DATABASE()';//'SHOW TABLES';
    $query_col_collation = 'SHOW FULL COLUMNS FROM %s';
    $tables = $CI->db->query($query_show_tables)->result();
    if(!empty($tables)){
        $CI->db->query(sprintf('SET foreign_key_checks = 0'));
        foreach($tables as $table){
            $table = (array) $table;
            if( isset($table['table_name']) && trim($table['table_name'])){
                $query_collation_generated  = sprintf($query_col_collation, $table['table_name']);
                $result_before = $CI->db->query($query_collation_generated)->result();
                db_show_table_column_collations($result_before, $table['table_name']);
                $CI->db->query(sprintf('ALTER TABLE %s CONVERT TO CHARACTER SET '.$charset.' COLLATE '.$collate, $table['table_name']));
                $result_after = $CI->db->query($query_collation_generated)->result();
                db_show_table_column_collations($result_after, $table['table_name'], true);
            }
        }
        $CI->db->query(sprintf('SET foreign_key_checks = 1'));
    }
   
}


/**
 * Shows table information
 * 
 * @param array of objects $data table fields data
 * @param string $table_name
 * @param bool $changed after or before changes
 * @return void
 */


function db_show_table_column_collations($data, $table_name, $changed=false){
    
    if( !empty($data) && trim($table_name) ){
        
        ?>
        <h2>Table <?php echo $table_name;?> columns collations (<?php echo $changed?'after':'before'?> changes) </h2>
        <table border="1" cellspacing="4" cellpadding="5" width="600" style="background-color:#<?php echo $changed?'C1F7C5;margin-bottom:40px;':'E6E6E6;'?>" >
            <tr>
                <th>Field name</th>
                <th>Type</th>
                <th>Collation</th>
            </tr>    
            <?php foreach($data as $data_item){ ?>
            <?php
            $recommended_length_for_varchar = 255;
            $too_short = stristr($data_item->Type,'varchar') && intval(str_replace(array('varchar(', ')'), array('',''), $data_item->Type))<$recommended_length_for_varchar;
            ?>
            <tr>
                <td><?php echo $data_item->Field?></td>
                <td><?php echo $data_item->Type?> <?php echo !$changed && $too_short?'<br/><strong style="color:red;font-size:17px">(This field might be too short. Recommended length is '.$recommended_length_for_varchar.')</strong>':''?> </td>
                <td><?php echo $data_item->Collation?$data_item->Collation:'NO'?></td>
            </tr>
            <?php } ?>
        </table>    
        <?php
        
        
    }
    
}
