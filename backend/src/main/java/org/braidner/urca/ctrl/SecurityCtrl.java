package org.braidner.urca.ctrl;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("api/security")
public class SecurityCtrl {

    @RequestMapping("/user-test")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        return Collections.singletonMap("name", principal.getAttribute("name"));
    }

    @GetMapping("user")
    public UserDetails currentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return (UserDetails) principal;
        } else if (principal instanceof DefaultOidcUser) {
            DefaultOidcUser oidcUser = (DefaultOidcUser) principal;
            return new User(oidcUser.getName(), "", Collections.emptyList());
        } else if (principal instanceof String) {
            //ignore anon
            return null;
        }

        throw new RuntimeException("No valid auth data: " + principal);
    }
}
