package org.braidner.urca.repository;

import org.braidner.urca.entity.BinanceKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BinanceKeyRepository extends JpaRepository<BinanceKey, Long> {

    Optional<BinanceKey> findByUsername(String username);
}
