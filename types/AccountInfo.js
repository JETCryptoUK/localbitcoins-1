class AccountInfo {
  _deserialize(data) {
    const {
      username,
      feedback_score,
      feedback_count,
      real_name_verifications_trusted,
      trading_partners_count,
      url,
      real_name_verifications_untrusted,
      has_feedback,
      identity_verified_at,
      trusted_count,
      feedbacks_unconfirmed_count,
      blocked_count,
      trade_volume_text,
      has_common_trades,
      real_name_verifications_rejected,
      age_text,
      confirmed_trade_count_text,
      created_at
    } = data

    this.username = username
    this.feedbackScore = feedback_score
    this.feedbackCount = feedback_count
    this.realNameVerificationsTrusted = real_name_verifications_trusted
    this.tradingPartnersCount = trading_partners_count
    this.url = url
    this.realNameVerificationsUntrusted = real_name_verifications_untrusted
    this.hasFeedback = has_feedback
    this.identityVerifiedAt = new Date(identity_verified_at).getTime()
    this.trustedCount = trusted_count
    this.feedbacksUnconfirmedCount = feedbacks_unconfirmed_count
    this.blockedCount = blocked_count
    this.tradeVolumeText = trade_volume_text
    this.hasCommonTrades = has_common_trades
    this.realNameVerificationsRejected = real_name_verifications_rejected
    this.ageText = age_text
    this.confirmedTradeCountText = confirmed_trade_count_text
    this.createdAt = new Date(created_at).getTime()

    return this
  }
}

module.exports = AccountInfo
