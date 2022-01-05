package org.braidner.urca.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "binance_keys")
public class BinanceKey {

    @Id
    private Long id;

    @Column(name = "owner_id")
    private String username;

    private String name;
    private String key;
    private String secret;

}
