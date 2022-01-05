package org.braidner.urca.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "binance_keys")
public class BinanceKey {

    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    private String name;
    private String key;
    private String secret;

}
